import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  countDocument: {
    count: null
  },
  auth: {
    loggedIn: false,
    authUser: null,
    idToken: null
  },
  user: {},
  testCol: [],
  eventList: []
})
export const mutations = {
  ...vuexfireMutations,
  login(state) {
    state.auth.loggedIn = true
  },
  updateUser(state, user) {
    state.authUser = user
  },
  logout(state) {
    state.auth.loggedIn = false
  },
  setToken(state, token) {
    state.auth.idToken = token
  }
}
export const actions = {
  bindCountDocument: firestoreAction(async function({ bindFirestoreRef }) {
    const ref = this.$fireStore
      .collection('countCollection')
      .doc('countDocument')
    await bindFirestoreRef('countDocument', ref, { wait: true })
  }),
  bindTestCollection: firestoreAction(async function({ bindFirestoreRef }) {
    const testRef = this.$fireStore.collection('test')
    await bindFirestoreRef('testCol', testRef)
  }),
  bindEventsCollection: firestoreAction(async function({ bindFirestoreRef }) {
    const eventsRef = this.$fireStore.collection('events')
    await bindFirestoreRef('eventList', eventsRef)
  }),
  initAuth(vuexContext, req) {
    let token
    let loggedIn

    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='))

      if (!jwtCookie) {
        return
      }

      token = jwtCookie.split('=')[1]

      loggedIn = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('loggedIn='))
        .split('=')[1]
    } else {
      token = localStorage.getItem('token')
      loggedIn = localStorage.getItem('loggedIn')

      if (!token || !loggedIn) {
        return
      }
    }

    vuexContext.commit('login')
    vuexContext.commit('setToken', token)
  }
}
export const getters = {
  count(state) {
    return state.countDocument.count
  },
  test(state) {
    return state.testCol
  },
  events(state) {
    return state.eventList
  },
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.authUser
  }
}
