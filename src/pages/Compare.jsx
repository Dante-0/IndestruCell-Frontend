import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Star } from 'lucide-react'
import productsData from '../data/products.json'

const Compare = () => {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [showProductSelector, setShowProductSelector] = useState(false)

  const addProduct = (product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product])
      setShowProductSelector(false)
    }
  }

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  const availableProducts = productsData.filter(
    product => !selectedProducts.find(p => p.id === product.id)
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Compare Produtos</h1>
          <p className="text-xl text-gray-600">
            Compare as especificações dos smartphones robustos lado a lado para encontrar o modelo perfeito para suas necessidades
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Compare Smartphones</h2>
          <p className="text-gray-600 mb-6">
            Selecione até 3 produtos para comparar suas especificações lado a lado
          </p>

          {selectedProducts.length < 3 && (
            <Button 
              onClick={() => setShowProductSelector(true)}
              className="mb-6 bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          )}
        </div>

        {showProductSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Selecionar Produto</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowProductSelector(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableProducts.map(product => (
                    <Card 
                      key={product.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => addProduct(product)}
                    >
                      <div className="relative h-32">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                        {product.discount && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                        <p className="text-green-600 font-bold text-sm">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              Nenhum produto selecionado para comparação
            </p>
            <Button 
              onClick={() => setShowProductSelector(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Produto
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {selectedProducts.map(product => (
                  <Card key={product.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => removeProduct(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <div className="relative h-48">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      {product.discount && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-2">{product.brand}</p>
                      
                      <div className="flex items-center mb-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm">{product.rating}</span>
                      </div>

                      <div className="mb-4">
                        <span className="text-2xl font-bold text-green-600">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        {product.old_price && (
                          <span className="text-gray-500 line-through ml-2">
                            R$ {product.old_price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-1">Categoria</h4>
                          <p className="text-sm">{product.category}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-1">Descrição</h4>
                          <p className="text-sm text-gray-600">{product.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-1">Recursos Principais</h4>
                          <div className="space-y-1">
                            {product.features.map((feature, index) => (
                              <p key={index} className="text-sm text-green-700 flex items-center">
                                <span className="mr-1">🎯</span> {feature}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                        Ver Detalhes
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedProducts.length > 0 && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => setSelectedProducts([])}
              className="mr-4"
            >
              Limpar Comparação
            </Button>
            {selectedProducts.length < 3 && (
              <Button 
                onClick={() => setShowProductSelector(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Mais Produtos
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Compare

