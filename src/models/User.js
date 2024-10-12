const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const City = require('./City');
const bcrypt = require('bcrypt'); // Importando o bcrypt para criptografia

class User extends Model {}

// Definindo o modelo User
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100), // Aumente o tamanho para acomodar a senha criptografada
    allowNull: false,
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

// Relacionamento do User com City
User.belongsTo(City, { foreignKey: 'cityId' });

// Antes de salvar um novo usuário, criptografa a senha
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10); // 10 é o fator de custo padrão do bcrypt
});

// Método para verificar a senha
User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password); // Compara a senha inserida com a senha criptografada no banco
};

module.exports = User;
