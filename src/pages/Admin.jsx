import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users, 
  Package, 
  BarChart3, 
  Plus,
  Settings,
  ShoppingBag
} from 'lucide-react'

const Admin = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && user.is_admin) {
      fetchStats()
    }
  }, [user])

  const fetchStats = async () => {
    try {
      // Buscar estatísticas do admin
      const [usersResponse, productsResponse] = await Promise.all([
        api.get('/admin/users').catch(() => ({ data: { users: [] } })),
        api.get('/products').catch(() => ({ data: { products: [] } }))
      ])

      setStats({
        totalUsers: usersResponse.data.users?.length || 0,
        totalProducts: productsResponse.data.products?.length || 0,
        totalOrders: 0 // Implementar quando houver sistema de pedidos
      })
    } catch (err) {
      setError('Erro ao carregar estatísticas')
    } finally {
      setLoading(false)
    }
  }

  if (!user || !user.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>
            Acesso negado. Você precisa ser um administrador para acessar esta página.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie usuários e produtos do sistema</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Usuários cadastrados no sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Produtos em estoque
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos em Estoque</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Disponíveis para venda
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                <Plus className="h-6 w-6" />
                <span>Adicionar Produto</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Users className="h-6 w-6" />
                <span>Gerenciar Usuários</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>Relatórios</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Seções de Gerenciamento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Usuários Cadastrados */}
          <Card>
            <CardHeader>
              <CardTitle>Usuários Cadastrados</CardTitle>
              <p className="text-sm text-gray-600">Lista de todos os usuários do sistema</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 border-b pb-2">
                  <span>Nome</span>
                  <span>Email</span>
                  <span>Telefone</span>
                  <span>Admin</span>
                </div>
                
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-600">
                    {stats.totalUsers === 0 ? 'Nenhum usuário encontrado' : `${stats.totalUsers} usuários cadastrados`}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Produtos Cadastrados */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos Cadastrados</CardTitle>
              <p className="text-sm text-gray-600">Lista de todos os produtos do sistema</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 border-b pb-2">
                  <span>Nome</span>
                  <span>Preço</span>
                  <span>Estoque</span>
                  <span>Status</span>
                </div>
                
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-600">
                    {stats.totalProducts === 0 ? 'Nenhum produto encontrado' : `${stats.totalProducts} produtos cadastrados`}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modo de Edição Fácil */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Modo de Edição Fácil
            </CardTitle>
            <p className="text-sm text-gray-600">
              Configure facilmente as informações do site
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center" asChild>
                <Link to="/edit-site">
                  <span className="font-medium">Editar Conteúdo do Site</span>
                  <span className="text-xs text-gray-600">Alterar textos, produtos e informações</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <span className="font-medium">Editar Informações da Empresa</span>
                <span className="text-xs text-gray-600">Contato, endereço, redes sociais</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <span className="font-medium">Gerenciar Categorias</span>
                <span className="text-xs text-gray-600">Adicionar/remover categorias de produtos</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <span className="font-medium">Configurar Textos do Site</span>
                <span className="text-xs text-gray-600">Títulos, descrições e conteúdo</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Admin

