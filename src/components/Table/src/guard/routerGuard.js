import store from '@/store'

export const setRouterGuard = (router) => {
  pageDataGuard(router)
}

const pageDataGuard = (router) => {
  router.beforeEach((to, from, next) => {
    const apiArr = []

    const meta = to.meta
    if (Reflect.has(meta, 'pageDataKeys')) {
      const pageDataKeys = meta.pageDataKeys
      for (const key of pageDataKeys) {
        const keyOptions = store.getters[`optionsData/${key}`]

        if (keyOptions && keyOptions.length === 0) {
          apiArr.push(store.dispatch(`optionsData/getOptionsData`, { key }))
        }
      }
    }

    if (apiArr.length > 0) {
      Promise.all(apiArr).then(() => {
        next()
      })
    } else {
      next()
    }
  })
}

