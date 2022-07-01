import { config } from 'lin-mizar';
import { Model, Sequelize } from 'sequelize';
import sequelize from '../lib/db';
class Djb extends Model {}
Djb.init(
    {
        id: {
            type: Sequelize.INTEGER,

            primaryKey: true,

            autoIncrement: true
        },

        xmname: {
            type: Sequelize.STRING(64)
        },

        sex: {
            type: Sequelize.INTEGER,

            allowNull: true
        },
        age: {
            type: Sequelize.INTEGER
        },
        ming: {
            type: Sequelize.INTEGER
        },
        idcard: {
            type: Sequelize.STRING(64),
            allowNull: true
        },
        telphone: {
            type: Sequelize.STRING(64)
        },
        pubdate: {
            type: Sequelize.DATE,

            allowNull: true
        },
        type: {
            type: Sequelize.INTEGER
        },
        laiyuan: {
            type: Sequelize.INTEGER
        },
        city: {
            type: Sequelize.STRING(64)
        },
        address: {
            type: Sequelize.STRING(64)
        },
        image: {
            type: Sequelize.STRING(64),
            get () {
                const image = this.getDataValue('image');
                return config.getItem('localMainImgUrlPrefix') + image;
            }
        },
        status: {
            type: Sequelize.INTEGER
        }
    },
    {
        // 定义表名

        tableName: 'djb',

        // 定义模型名称

        modelName: 'djb',

        // 启用软删除

        paranoid: true,

        // 自动写入时间

        timestamps: true,

        // 重命名时间字段

        createdAt: 'created_at',

        updatedAt: 'updated_at',

        deletedAt: 'deleted_at',

        sequelize
    }
);
export { Djb as DangjianModel };
