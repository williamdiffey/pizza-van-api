const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Menu Endpoints', function() {
  let db

  const {
    testUsers,
    testmenu,
    testComments,
  } = helpers.makemenuFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/menu`, () => {
    context(`Given no menu`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/menu')
          .expect(200, [])
      })
    })

    context('Given there are menu in the database', () => {
      beforeEach('insert menu', () =>
        helpers.seedmenuTables(
          db,
          testUsers,
          testmenu,
          testComments,
        )
      )

      it('responds with 200 and all of the menu', () => {
        const expectedmenu = testmenu.map(menu =>
          helpers.makeExpectedmenu(
            testUsers,
            menu,
            testComments,
          )
        )
        return supertest(app)
          .get('/api/menu')
          .expect(200, expectedmenu)
      })
    })

    context(`Given an XSS attack menu`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousmenu,
        expectedmenu,
      } = helpers.makeMaliciousmenu(testUser)

      beforeEach('insert malicious menu', () => {
        return helpers.seedMaliciousmenu(
          db,
          testUser,
          maliciousmenu,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/menu`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedmenu.title)
            expect(res.body[0].content).to.eql(expectedmenu.content)
          })
      })
    })
  })

  describe(`GET /api/menu/:menu_id`, () => {
    context(`Given no menu`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const menuId = 123456
        return supertest(app)
          .get(`/api/menu/${menuId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `menu doesn't exist` })
      })
    })

    context('Given there are menu in the database', () => {
      beforeEach('insert menu', () =>
        helpers.seedmenuTables(
          db,
          testUsers,
          testmenu,
          testComments,
        )
      )

      it('responds with 200 and the specified menu', () => {
        const menuId = 2
        const expectedmenu = helpers.makeExpectedmenu(
          testUsers,
          testmenu[menuId - 1],
          testComments,
        )

        return supertest(app)
          .get(`/api/menu/${menuId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedmenu)
      })
    })

    context(`Given an XSS attack menu`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousmenu,
        expectedmenu,
      } = helpers.makeMaliciousmenu(testUser)

      beforeEach('insert malicious menu', () => {
        return helpers.seedMaliciousmenu(
          db,
          testUser,
          maliciousmenu,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/menu/${maliciousmenu.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedmenu.title)
            expect(res.body.content).to.eql(expectedmenu.content)
          })
      })
    })
  })

  describe(`GET /api/menu/:menu_id/comments`, () => {
    context(`Given no menu`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const menuId = 123456
        return supertest(app)
          .get(`/api/menu/${menuId}/comments`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `menu doesn't exist` })
      })
    })

    context('Given there are comments for menu in the database', () => {
      beforeEach('insert menu', () =>
        helpers.seedmenuTables(
          db,
          testUsers,
          testmenu,
          testComments,
        )
      )

      it('responds with 200 and the specified comments', () => {
        const menuId = 1
        const expectedComments = helpers.makeExpectedmenuComments(
          testUsers, menuId, testComments
        )

        return supertest(app)
          .get(`/api/menu/${menuId}/comments`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedComments)
      })
    })
  })
})
