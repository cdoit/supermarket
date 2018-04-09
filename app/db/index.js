"use strict";

var Sequelize = require("sequelize");

exports.initvillamarket = function() {
  var sequelize = new Sequelize("cdovillamarket", "test", "test", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: console.log,
    //东八时区
    timezone: "+08:00"
  });

  //��ʼ���û���
  var User = sequelize.import("../wx/models/user.js");
  var UserInfo = sequelize.import("../wx/models/userInfo.js");
  //�û��Ľ�ɫ��
  var Role = sequelize.import("../wx/models/role.js");
  //搜索历史
  var HistorySearch = sequelize.import("../wx/models/historySearch.js");
  //楼盘
  var Building = sequelize.import("../wx/models/building.js");
  //户型
  var ApartmentLayout = sequelize.import("../wx/models/apartmentLayout.js");
  //产品
  var Product = sequelize.import("../wx/models/product.js");
  //产品对应的全景图、平面图
  var Panorama = sequelize.import("../wx/models/panorama.js");
  var Photo = sequelize.import("../wx/models/photo.js");
  //评论
  var Comment_ = sequelize.import("../wx/models/comment.js");
  //订单
  var Order = sequelize.import("../wx/models/order.js");
  //订单施工图
  var Constructplans = sequelize.import("../wx/models/constructplans.js");
  //项目施工过程信息
  var Constructrecord = sequelize.import("../wx/models/constructrecord.js");
  //管理员
  var AdminInfo = sequelize.import("../wx/models/adminInfo.js");
  //权限
  var Function_ = sequelize.import("../wx/models/function.js");
  //日志
  var Log = sequelize.import("../wx/models/log.js");
  //数据字典
  var Dictionary = sequelize.import("../wx/models/dictionary.js");
  //省市区
  var County = sequelize.import("../wx/models/county.js");
  var City = sequelize.import("../wx/models/city.js");
  var Province = sequelize.import("../wx/models/province.js");
  //广告
  var Ad = sequelize.import("../wx/models/ad.js");

  //user与userInfo的关联关系
  User.hasOne(UserInfo);
  UserInfo.belongsTo(User);
  //role与user的关联关系 
  User.hasMany(HistorySearch, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "HistorySearchs"
  });
  Building.hasMany(HistorySearch, {
    foreignKey: "building_id",
    targetKey: "id",
    as: "HistorySearchs"
  });
  //apartmentLayout与Building的关联
  Building.hasMany(ApartmentLayout, {
    foreignKey: "building_id",
    targetKey: "id",
    as: "ApartmentLayouts"
  });
  //ApartmentLayout  与 Product 关联
  ApartmentLayout.hasMany(Product, {
    foreignKey: "apartmentLayout_id",
    targetKey: "id",
    as: "Products"
  });
  //Product与Panorama、Photo的关联
  Product.hasMany(Panorama, {
    foreignKey: "product_id",
    targetKey: "id",
    as: "Panoramas"
  });
  Product.hasMany(Photo, {
    foreignKey: "product_id",
    targetKey: "id",
    as: "Photos"
  });
  //order与comment的关联
  Order.hasMany(Comment_, {
    foreignKey: "order_id",
    targetKey: "id",
    as: "Comments"
  });
  //product与comment的关联
  Product.hasMany(Comment_, {
    foreignKey: "product_id",
    targetKey: "id",
    as: "Comments"
  });
  User.hasMany(Comment_, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "Comments"
  });
  //Order与Constructplans的关联
  Order.hasMany(Constructplans, {
    foreignKey: "order_id",
    targetKey: "id",
    as: "Constructplans"
  });
  Order.hasMany(Constructrecord, {
    foreignKey: "order_id",
    targetKey: "id",
    as: "Constructrecords"
  });

  //Product与order的关联
  Product.hasMany(Order, {
    foreignKey: "product_id",
    targetKey: "id",
    as: "Orders"
  });
  //user与order的关联
  User.hasMany(Order, { foreignKey: "user_id", targetKey: "id", as: "Orders" });
  //adminInfo与order的关联
  //AdminInfo.hasMany(Order, { foreignKey: 'adminInfo_id', targetKey: 'id', as: 'Orders' });
  //adminInfo与role的关联
  Role.hasMany(AdminInfo, {
    foreignKey: "role_id",
    targetKey: "id",
    as: "AdminInfos"
  });
  //adminInfo与log的关联
  Log.hasMany(AdminInfo, {
    foreignKey: "role_id",
    targetKey: "id",
    as: "AdminInfos"
  });
  // 角色与权限的关联
  Role.belongsToMany(Function_, {
    through: "roleFunctions",
    as: "roleFunctions"
  });
  Function_.belongsToMany(Role, {
    through: "roleFunctions",
    as: "roleFunctions"
  });

  // �Ƴ�����
  sequelize.sync();

  exports.villamarketstorage = Object.create({});
  exports.villamarketstorage.Sequelize = sequelize;
  
  exports.villamarketstorage.User = User;
  exports.villamarketstorage.UserInfo = UserInfo;
  exports.villamarketstorage.Role = Role;
  exports.villamarketstorage.HistorySearch = HistorySearch;
  exports.villamarketstorage.Building = Building;
  exports.villamarketstorage.ApartmentLayout = ApartmentLayout;
  exports.villamarketstorage.Product = Product;
  exports.villamarketstorage.Panorama = Panorama;
  exports.villamarketstorage.Photo = Photo;
  exports.villamarketstorage.Constructplans = Constructplans;
  exports.villamarketstorage.Constructrecord = Constructrecord;
  exports.villamarketstorage.Order = Order;
  exports.villamarketstorage.Comment_ = Comment_;

  exports.villamarketstorage.AdminInfo = AdminInfo;
  exports.villamarketstorage.Function_ = Function_;
  exports.villamarketstorage.Log = Log;
  exports.villamarketstorage.Dictionary = Dictionary;
  exports.villamarketstorage.Ad = Ad;

  exports.villamarketstorage.Province = Province;
  exports.villamarketstorage.County = County;
  exports.villamarketstorage.City = City;
};