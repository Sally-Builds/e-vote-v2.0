import { LocalStorage, Cookies } from 'quasar'
import { boot, route } from 'quasar/wrappers'
import store from '../store/auth'

export default async({router, app}) => {
    router.beforeEach((to, from, next) => {
        const isLoggedIn = LocalStorage.getItem('isLoggedIn')
        const userRole = LocalStorage.getItem('role')
        if(to.matched.some(record => record.meta.adminUser)){
            if(isLoggedIn){
                if(userRole === 0){
                    next(`${from.path}`)
                }else {
                    next()
                }
            }else {
                next(`${from.path}`)
            }
        }else if(to.matched.some(record => record.meta.noAuth)){
            if(isLoggedIn){
                next(`${from.path}`)
            }else{
                next()
            }
        }else if(to.matched.some(record => record.meta.auth)){
            if(isLoggedIn){
                next()
            }else {
                next(`${from.path}`)
            }
        }
        else {
            next()
        }

    })
}
