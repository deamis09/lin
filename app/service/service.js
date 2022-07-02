import {BookNotFound} from "../lib/exception";
import {DyubeiDao} from "../dao/dyubei";
import {DjbDao} from "../dao/djb";

class Content{
    static async  addContent(v){
         switch (v['type']){
             case 100:
                 await  DyubeiDao.create(v)
                 break
             case 200:
                 await DjbDao.create(v)
                 break
             case 300:
                 break
             default:
                 throw  new BookNotFound({
                     msg: '不存在'
                 })
         }
    }

    static async editContent(id, p) {

    }

}
export {Content as Contentservice}