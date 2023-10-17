import router from ".";
// @ts-ignore
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import useUserStore from '@/stores/modules/user'
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
nprogress.configure({ showSpinner: false })
const whiteList = ['/home', '/hospital/register/data', '/hospital/detail', '/hospital/renotice', '/hospital/clnotice', '/hospital/search', '/wxLogin']
router.beforeEach((to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext) => {
    const userStore = useUserStore()
    nprogress.start()
    if (userStore.userData.token) {
        next()
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            router.push({
                path: '/home',
            })
            userStore.setShowLoginDialog(true)
        }
    }
})
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    nprogress.done()
})