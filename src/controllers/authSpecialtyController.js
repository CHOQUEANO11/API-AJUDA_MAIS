import SpecialtyUser from '../models/UserSpecialty.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginSpecialty = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SpecialtyUser.findOne({ email })
    .populate('orgao_id', 'name') // Popula o nome do órgão
    .populate('specialty_id', 'name');; // Popula o nome da especialidade

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Credenciais inválidas!' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login bem-sucedido!', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

export default loginSpecialty;
