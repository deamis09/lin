import {BookNotFound} from "../lib/exception";
import {DyubeiDao} from "../dao/dyubei";
import {DjbDao} from "../dao/djb";
import {DapplyModel} from "../model/apply";
import {DapplyDao} from "../dao/dapply";
import {DangjianModel} from "../model/dbj";
import {Forbidden} from "lin-mizar";

class Content {
    static async getContentList() {
        const djb = await DjbDao.getDjbList()
        const dyubei = await DyubeiDao.getDjbList()
        const dapply = await DapplyDao.getDjbList()
        let res = []
        res.push.apply(res, djb)
        res.push.apply(res, dyubei)
        res.push.apply(res, dapply)
        res.sort((a, b) => b.created_at.localeCompare(a.created_at))
        return res

    }

    static async addContent(v) {
        switch (v['type']) {
            case 100:

                await DjbDao.addDjb(v)
                break
            case 200:
                await DyubeiDao.addDjb(v)
                break
            case 300:
                await DapplyDao.addDjb(v)
                break
            default:
                throw  new BookNotFound({
                    msg: '不存在'
                })
        }
    }

    static async deleteContent(id, type) {
        switch (type) {
            case 100:
                await DjbDao.deleteDjbList(id)
                break
            case 200:
                await DyubeiDao.deleteDjbList(id)
                break
            case 300:
                await DapplyDao.deleteDjbList(id)
                break
            default:
                throw  new BookNotFound({
                    msg: '不存在'
                })
        }
    }

    static async editContent(id, params) {
        switch (params['type']) {
            case 100:
                await DjbDao.editDjbList(id, params)
                break
            case 200:
                await DyubeiDao.editDjbList(id, params)
                break
            case 300:
                await DapplyDao.addDjb(id, params)
                break
            default:
                throw  new BookNotFound({
                    msg: '不存在'
                })
        }
    }


}


export {Content as Contentservice}