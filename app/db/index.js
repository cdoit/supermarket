"use strict";

var Sequelize = require("sequelize");
var Sequelize2 = require("sequelize");
var Sequelize3 = require("sequelize");
//��ʼ����ǰ���ݿ���Ϣ
exports.initdevice = function() {
  var sequelize = new Sequelize("cdodevice", "test", "test", {
    host: "127.0.0.1", //172.17.0.3
    port: 3306,
    dialect: "mysql",
    logging: console.log,
    //东八时区
    timezone: "+08:00"
  });

  var Company = sequelize.import("../device/models/company.js");

  var Payrole = sequelize.import("../device/models/payrole.js");
  var Layouttrole = sequelize.import("../device/models/layouttrole.js");
  var Framesticks = sequelize.import("../device/models/framesticks.js");
  var Frames = sequelize.import("../device/models/frames.js");
  var Equipmentsticks = sequelize.import("../device/models/equipmentsticks.js");
  var Equipmentdealer = sequelize.import("../device/models/equipmentdealer.js");

  var ApartmentLayout = sequelize.import("../device/models/apartmentLayout.js");
  var Equipment = sequelize.import("../device/models/equipment.js");

  var Equipmentparameter = sequelize.import(
    "../device/models/equipmentparameter.js"
  );

  var Equipmentposition = sequelize.import(
    "../device/models/equipmentposition.js"
  );

  var Factoryversion = sequelize.import("../device/models/factoryversion.js");

  // var Project = sequelize.import('../device/models/project.js');

  //管理员
  var AdminInfo = sequelize.import("../device/models/adminInfo.js");
  //权限
  var Function_ = sequelize.import("../device/models/function.js");
  var Role = sequelize.import("../device/models/role.js");
  //日志
  var Log = sequelize.import("../device/models/log.js");
  var Systemlog = sequelize.import("../device/models/systemlog.js");

  //数据字典
  var Dictionary = sequelize.import("../device/models/dictionary.js");
  //省市区
  var County = sequelize.import("../device/models/county.js");
  var City = sequelize.import("../device/models/city.js");
  var Province = sequelize.import("../device/models/province.js");
  // var Scheme = sequelize.import('../device/models/scheme.js');

  Equipment.hasOne(Equipmentparameter);
  Equipmentparameter.belongsTo(Equipment);

  Equipment.hasOne(Equipmentposition);
  Equipmentposition.belongsTo(Equipment);

  Equipment.hasOne(Factoryversion);
  Factoryversion.belongsTo(Equipment);

  Equipment.hasMany(Payrole, {
    foreignKey: "equipment_id",
    targetKey: "id",
    as: "Payroles"
  });
  // ApartmentLayout.hasMany(Bar, { foreignKey: 'apartmentLayout_id', targetKey: 'id', as: 'Bars' });
  Equipment.hasMany(Layouttrole, {
    foreignKey: "equipment_id",
    targetKey: "id",
    as: "Layouttroles"
  });
  ApartmentLayout.hasMany(Layouttrole, {
    foreignKey: "apartmentLayout_id",
    targetKey: "id",
    as: "Layouttroles"
  });

  //adminInfo与role的关联
  Role.hasMany(AdminInfo, {
    foreignKey: "role_id",
    targetKey: "id",
    as: "AdminInfos"
  });
  //adminInfo与log的关联
  AdminInfo.hasMany(Log, {
    foreignKey: "admin_id",
    targetKey: "id",
    as: "Logs"
  });
  Company.hasMany(AdminInfo, {
    foreignKey: "company_id",
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

  exports.Sequelize = sequelize;
  exports.devicestorage = Object.create({});
  // exports.devicestorage.Project = Project;

  exports.Company = Company;
  // exports.Design = Design;
  exports.Role = Role;
  exports.Equipment = Equipment;
  exports.Equipmentparameter = Equipmentparameter;
  exports.Equipmentposition = Equipmentposition;
  exports.Factoryversion = Factoryversion;

  exports.AdminInfo = AdminInfo;
  exports.Function_ = Function_;
  exports.Log = Log;
  exports.Dictionary = Dictionary;
  exports.Systemlog = Systemlog;
  exports.ApartmentLayout = ApartmentLayout;
  exports.Equipmentsticks = Equipmentsticks;
  exports.Framesticks = Framesticks;
  exports.Frames = Frames;
  exports.Payrole = Payrole;
  exports.Layouttrole = Layouttrole;
  exports.Equipmentdealer = Equipmentdealer;

  exports.Province = Province;
  exports.County = County;
  exports.City = City;
};

exports.initmaterial = function() {
  var sequelize = new Sequelize("cdomaterial", "test", "test", {
    host: "127.0.0.1", //192.168.31.108
    port: 3306,
    dialect: "mysql",
    logging: console.log,
    //东八时区
    timezone: "+08:00"
  });

  var House = sequelize.import("../material/models/house.js");
  var Houseplan = sequelize.import("../material/models/houseplan.js");
  var Designpackge = sequelize.import("../material/models/designpackge.js");

  var Supplybook = sequelize.import("../material/models/supplybook.js");
  var Supply = sequelize.import("../material/models/supply.js");
  var Purchase = sequelize.import("../material/models/purchase.js");
  var Materialcategory = sequelize.import(
    "../material/models/materialcategory.js"
  );
  var Material = sequelize.import("../material/models/material.js");
  var Calculation = sequelize.import("../material/models/calculation.js");
  var Deliver = sequelize.import("../material/models/deliver.js");

  House.hasOne(Houseplan);
  Houseplan.belongsTo(House);

  Houseplan.hasOne(Designpackge);
  Designpackge.belongsTo(Houseplan);

  Materialcategory.hasOne(Material);
  Material.belongsTo(Materialcategory);

  Material.hasOne(Purchase);
  Purchase.belongsTo(Material);

  Material.hasOne(Calculation);
  Calculation.belongsTo(Material);

  Purchase.hasOne(Deliver);
  Deliver.belongsTo(Purchase);

  Supplybook.hasMany(Supply, {
    foreignKey: "supplybook_id",
    targetKey: "id",
    as: "Supplys"
  });
  Material.hasMany(Supply, {
    foreignKey: "material_id",
    targetKey: "id",
    as: "Supplys"
  });

  // Materialcategory.hasMany(Material, { foreignKey: 'category_id', targetKey: 'id', as: 'Materials' });

  sequelize.sync();

  exports.Sequelize2 = sequelize;

  exports.House = House;
  exports.Houseplan = Houseplan;
  exports.Designpackge = Designpackge;
  exports.Supplybook = Supplybook;
  exports.Supply = Supply;
  exports.Purchase = Purchase;
  exports.Materialcategory = Materialcategory;
  exports.Material = Material;
  exports.Calculation = Calculation;
  exports.Deliver = Deliver;
};

exports.initpurchase = function() {
  // var sequelize = new Sequelize("cdopurchase", "test", "test", {
  //   host: "127.0.0.1",
  //   port: 3306,
  //   dialect: "mysql",
  //   logging: console.log,
  //   //东八时区
  //   timezone: "+08:00"
  // });
  // var Project = sequelize.import("../material/models/project.js");
  // var Materielcomponent = sequelize.import(
  //   "../material/models/materielcomponent.js"
  // );
  // var Meteragebill = sequelize.import("../material/models/meteragebill.js");
  // var Purchasebill = sequelize.import("../material/models/purchasebill.js");
  // Project.hasOne(Materielcomponent);
  // Materielcomponent.belongsTo(Project);
  // Materielcomponent.hasOne(Meteragebill);
  // Meteragebill.belongsTo(Materielcomponent);
  // Project.hasOne(Purchasebill);
  // Purchasebill.belongsTo(Project);
  // sequelize.sync();
  // exports.purchasestorage = Object.create({});
  // exports.purchasestorage.Sequelize = sequelize;
  // exports.purchasestorage.Project = Project;
  // exports.purchasestorage.Materielcomponent = Materielcomponent;
  // exports.purchasestorage.Meteragebill = Meteragebill;
  // exports.purchasestorage.Purchasebill = Purchasebill;
};

exports.initwx = function() {
  var sequelize = new Sequelize("cdolute", "test", "test", {
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
  //Role.hasMany(User, { foreignKey: 'role_id', targetKey: 'id', as: 'Users' });
  //HistorySearch与User、Building的关联
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

  exports.Sequelize3 = sequelize;
  exports.User = User;
  // exports.Manager = Manager;
  exports.UserInfo = UserInfo;
  exports.Role = Role;
  exports.HistorySearch = HistorySearch;
  exports.Building = Building;
  exports.ApartmentLayout = ApartmentLayout;
  exports.Product = Product;
  exports.Panorama = Panorama;
  exports.Photo = Photo;
  exports.Constructplans = Constructplans;
  exports.Constructrecord = Constructrecord;
  exports.Order = Order;
  exports.Comment_ = Comment_;

  exports.AdminInfo = AdminInfo;
  exports.Function_ = Function_;
  exports.Log = Log;
  exports.Dictionary = Dictionary;
  exports.Ad = Ad;

  exports.Province = Province;
  exports.County = County;
  exports.City = City;
};

exports.initworktask = function() {
  var sequelize = new Sequelize("cdowork", "test", "test", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: console.log,
    //东八时区
    timezone: "+08:00"
  });
  var profession = sequelize.import("../labor/models/profession.js");
  var tasktype = sequelize.import("../labor/models/tasktype.js");
  var employee = sequelize.import("../labor/models/employee.js");
  var project = sequelize.import("../labor/models/project.js");
  var projectphase = sequelize.import("../labor/models/projectphase.js");
  var workrole = sequelize.import("../labor/models/workrole.js");
  var worktask = sequelize.import("../labor/models/worktask.js");

  sequelize.sync();

  exports.Sequelize4 = sequelize;
  exports.worktaskstorage = Object.create({});
  exports.worktaskstorage.profession = profession;
  exports.worktaskstorage.sequelize = sequelize;

  exports.Employee = employee;
  exports.Worktask = worktask;
  exports.Tasktype = tasktype;
  exports.Profession = profession;
  exports.Project = project;
  exports.Projectphase = projectphase;
  exports.Workrole = workrole;
};

exports.initvillamarket = function() {
  var sequelize = new Sequelize("cdovillamarket", "test", "test", {
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: console.log,
    //东八时区
    timezone: "+08:00"
  });

  sequelize.sync();

  exports.villamarketstorage = Object.create({});
  exports.villamarketstorage.Sequelize = sequelize;
};
