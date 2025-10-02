import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Battery, 
  Camera, 
  Satellite, 
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Ulefone Armor 26 Ultra",
      category: "Powerhouse Multimídia",
      price: 5370,
      originalPrice: 6200,
      discount: 13,
      rating: 4.8,
      feature: "Alto-falante 121dB + Walkie-Talkie",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Blackview BL9000 Pro",
      category: "Câmera Térmica Profissional",
      price: 5530,
      originalPrice: 6400,
      discount: 14,
      rating: 4.8,
      feature: "Câmera Térmica FLIR® de alta resolução",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Unihertz Tank 2",
      category: "Cinema Portátil",
      price: 5040,
      originalPrice: 5800,
      discount: 13,
      rating: 4.8,
      feature: "Projetor a Laser DLP integrado",
      image: "/api/placeholder/300/200"
    }
  ]

  const features = [
    {
      icon: Shield,
      title: "Resistência Extrema",
      description: "Certificações IP68/IP69K e MIL-STD-810H garantem proteção total contra água, poeira e quedas."
    },
    {
      icon: Battery,
      title: "Bateria Gigante",
      description: "Baterias de até 22.000 mAh para dias de uso sem recarga, ideais para trabalho em campo."
    },
    {
      icon: Camera,
      title: "Tecnologia Avançada",
      description: "Câmeras térmicas, visão noturna e recursos únicos que nenhum smartphone comum possui."
    },
    {
      icon: Satellite,
      title: "Conectividade Total",
      description: "Comunicação via satélite, walkie-talkie e 5G para estar conectado em qualquer lugar."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-100 border-blue-400">
              🛡️ Smartphones com as melhores notas nos testes de resistência
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Celulares que Resistem ao Impossível
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Descubra nossa curadoria exclusiva de smartphones robustos com tecnologias únicas: 
            câmeras térmicas, visão noturna, comunicação via satélite e muito mais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/products">
                Ver Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que Escolher um Indestrutível?
            </h2>
            <p className="text-xl text-gray-600">
              Smartphones robustos oferecem recursos únicos que vão muito além da resistência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-gray-600">
              Conheça os smartphones mais inovadores da nossa seleção
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-red-500">
                    -{product.discount}%
                  </Badge>
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-sm">
                    {product.category}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">
                    O smartphone robusto mais potente com recursos únicos
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        R$ {product.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 line-through ml-2">
                        R$ {product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-green-600 mb-4">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {product.feature}
                  </div>

                  <Button className="w-full" variant="outline">
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para o Indestrutível?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Explore nossa seleção completa e encontre o smartphone robusto perfeito para suas necessidades
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/products">
              Explorar Catálogo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home

