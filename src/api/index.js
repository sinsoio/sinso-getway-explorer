import server from '@/plugins/axios'

export const getMiningWhitelist = (params) =>
  server.get('/api/mining_whitelist/get', params)
export const whitelistAdd = (params) =>
  server.post('/api/mining_whitelist/add', params)
