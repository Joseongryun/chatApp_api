module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Users', {
    uId: {
      field: "uid",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userName: {
      field: "username",
      type: DataTypes.STRING(32),
      allowNull: false
    },
    password: {
      field: "password",
      type: DataTypes.STRING(32),
      allowNull: false
    },
    description: {
      field: "description",
      type: DataTypes.STRING(50),
      allowNull: false
    },
    isOnline: {
      field: "is_online",
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    underscored: true,
    tableName: 'users',
    freezeTableName: true,
    timestamps: true
  })
}