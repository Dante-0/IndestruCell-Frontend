import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Search } from 'lucide-react'
import productsData from '../data/products.json'

const Products = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('Todos')
  const [sortOrder, setSortOrder] = useState('Nome A-Z')

  useEffect(() => {
    let filtered = productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (filterCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === filterCategory)
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'Nome A-Z') {
        return a.name.localeCompare(b.name)
      } else if (sortOrder === 'Preço Crescente') {
        return a.price - b.price
      } else if (sortOrder === 'Preço Decrescente') {
        return b.price - a.price
      }
      return 0
    })

    setProducts(sorted)
  }, [searchTerm, filterCategory, sortOrder])

  const categories = ['Todos', ...new Set(productsData.map(p => p.category))]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Produtos</h1>
          <p className="text-xl text-gray-600">
            Explore nossa seleção completa de smartphones indestrutíveis com tecnologias únicas
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="Nome A-Z">Nome A-Z</option>
              <option value="Preço Crescente">Preço Crescente</option>
              <option value="Preço Decrescente">Preço Decrescente</option>
            </select>
          </div>
        </div>

        <p className="text-gray-600 mb-6">Mostrando {products.length} de {productsData.length} produtos</p>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Nenhum produto encontrado com os filtros aplicados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.discount && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                  
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm text-gray-700">{product.rating}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xl font-bold text-green-600">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    {product.old_price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        R$ {product.old_price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-green-700 mb-4">
                    {product.features.map((feature, index) => (
                      <p key={index} className="flex items-center">
                        <span className="mr-1">🎯</span> {feature}
                      </p>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      Ver Detalhes
                    </Button>
                    <Button size="icon" className="bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products

