import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Shield, ShoppingCart, User, LogOut } from 'lucide-react'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <div className="bg-green-700 p-2 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <span className="text-white">IndestruCell</span>
              <div className="text-xs text-green-200">Smartphones Indestrutíveis</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-200 transition-colors">
              Início
            </Link>
            <Link to="/products" className="hover:text-green-200 transition-colors">
              Produtos
            </Link>
            <Link to="/compare" className="hover:text-green-200 transition-colors">
              Comparar
            </Link>
            <Link to="/about" className="hover:text-green-200 transition-colors">
              Sobre Nós
            </Link>
            <Link to="/contact" className="hover:text-green-200 transition-colors">
              Contato
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">
                    Olá, {user.is_admin ? 'Administrador' : user.name}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-white hover:bg-green-700"
                  >
                    <Link to="/profile">
                      <User className="h-4 w-4 mr-1" />
                      Perfil
                    </Link>
                  </Button>

                  {user.is_admin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-white hover:bg-green-700"
                    >
                      <Link to="/admin">
                        Admin
                      </Link>
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-white hover:bg-green-700"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sair
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-white hover:bg-green-700"
                >
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  <Link to="/register">Cadastrar</Link>
                </Button>
              </div>
            )}

            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-green-700 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

