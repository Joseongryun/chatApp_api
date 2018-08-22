module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Messages', {
    mId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sendUsername: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    receiveUsername: {
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