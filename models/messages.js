module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Messages', {
    mId: {
      field: "mid",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sUid: {
      field: "s_uid",
      type: DataTypes.STRING(32),
      allowNull: false
    },
    rUid: {
      field: "r_uid",
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'messages',
    freezeTableName: true,
    timestamps: true
  })
}