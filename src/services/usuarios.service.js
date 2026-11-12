import api from '../api/api'

export const cambiarPlanService = async () => {
  const res = await api.patch('/usuarios/plan')
  return res.data
}
