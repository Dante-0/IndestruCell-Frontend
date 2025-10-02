import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, 
  Save, 
  Building, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  Package,
  Palette
} from 'lucide-react'
import siteConfigData from '../data/siteConfig.json'

const EditSite = () => {
  const { user } = useAuth()
  const [config, setConfig] = useState(siteConfigData)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

  const handleSave = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Simular salvamento (em uma implementação real, enviaria para o backend)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Salvar no localStorage como fallback
      localStorage.setItem('siteConfig', JSON.stringify(config))
      
      setSuccess('Configurações salvas com sucesso!')
      
      // Recarregar a página após 2 segundos para aplicar as mudanças
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError('Erro ao salvar configurações')
    } finally {
      setLoading(false)
    }
  }

  const updateConfig = (path, value) => {
    const newConfig = { ...config }
    const keys = path.split('.')
    let current = newConfig
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    
    current[keys[keys.length - 1]] = value
    setConfig(newConfig)
  }

  const updateFeaturedProduct = (index, field, value) => {
    const newConfig = { ...config }
    newConfig.featuredProducts[index][field] = value
    setConfig(newConfig)
  }

  const updateFeature = (index, field, value) => {
    const newConfig = { ...config }
    newConfig.features[index][field] = value
    setConfig(newConfig)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Settings className="mr-3 h-8 w-8" />
            Editor do Site
          </h1>
          <p className="text-gray-600">Configure facilmente as informações do seu site</p>
        </div>

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="company">Empresa</TabsTrigger>
            <TabsTrigger value="hero">Página Inicial</TabsTrigger>
            <TabsTrigger value="features">Recursos</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="cta">Call to Action</TabsTrigger>
          </TabsList>

          {/* Informações da Empresa */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Informações da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input
                      id="company-name"
                      value={config.company.name}
                      onChange={(e) => updateConfig('company.name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company-tagline">Slogan</Label>
                    <Input
                      id="company-tagline"
                      value={config.company.tagline}
                      onChange={(e) => updateConfig('company.tagline', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company-description">Descrição da Empresa</Label>
                  <Textarea
                    id="company-description"
                    value={config.company.description}
                    onChange={(e) => updateConfig('company.description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="company-email" className="flex items-center">
                      <Mail className="mr-1 h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="company-email"
                      type="email"
                      value={config.company.contact.email}
                      onChange={(e) => updateConfig('company.contact.email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company-phone" className="flex items-center">
                      <Phone className="mr-1 h-4 w-4" />
                      Telefone
                    </Label>
                    <Input
                      id="company-phone"
                      value={config.company.contact.phone}
                      onChange={(e) => updateConfig('company.contact.phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company-address" className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      Endereço
                    </Label>
                    <Input
                      id="company-address"
                      value={config.company.contact.address}
                      onChange={(e) => updateConfig('company.contact.address', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seção Hero */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  Seção Principal (Hero)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="hero-badge">Badge/Destaque</Label>
                  <Input
                    id="hero-badge"
                    value={config.hero.badge}
                    onChange={(e) => updateConfig('hero.badge', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="hero-title">Título Principal</Label>
                  <Input
                    id="hero-title"
                    value={config.hero.title}
                    onChange={(e) => updateConfig('hero.title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="hero-subtitle">Subtítulo</Label>
                  <Textarea
                    id="hero-subtitle"
                    value={config.hero.subtitle}
                    onChange={(e) => updateConfig('hero.subtitle', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hero-primary-button">Botão Principal</Label>
                    <Input
                      id="hero-primary-button"
                      value={config.hero.primaryButton}
                      onChange={(e) => updateConfig('hero.primaryButton', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-secondary-button">Botão Secundário</Label>
                    <Input
                      id="hero-secondary-button"
                      value={config.hero.secondaryButton}
                      onChange={(e) => updateConfig('hero.secondaryButton', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recursos/Features */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Recursos e Vantagens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {config.features.map((feature, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Recurso {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={feature.title}
                          onChange={(e) => updateFeature(index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Ícone</Label>
                        <Input
                          value={feature.icon}
                          onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                          placeholder="Shield, Battery, Camera, etc."
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Produtos em Destaque */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Produtos em Destaque
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {config.featuredProducts.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Produto {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome do Produto</Label>
                        <Input
                          value={product.name}
                          onChange={(e) => updateFeaturedProduct(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Categoria</Label>
                        <Input
                          value={product.category}
                          onChange={(e) => updateFeaturedProduct(index, 'category', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Preço (R$)</Label>
                        <Input
                          type="number"
                          value={product.price}
                          onChange={(e) => updateFeaturedProduct(index, 'price', parseFloat(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Preço Original (R$)</Label>
                        <Input
                          type="number"
                          value={product.originalPrice}
                          onChange={(e) => updateFeaturedProduct(index, 'originalPrice', parseFloat(e.target.value))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Recurso Principal</Label>
                      <Input
                        value={product.feature}
                        onChange={(e) => updateFeaturedProduct(index, 'feature', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        value={product.description}
                        onChange={(e) => updateFeaturedProduct(index, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Call to Action */}
          <TabsContent value="cta">
            <Card>
              <CardHeader>
                <CardTitle>Seção de Chamada para Ação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="cta-title">Título</Label>
                  <Input
                    id="cta-title"
                    value={config.cta.title}
                    onChange={(e) => updateConfig('cta.title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="cta-subtitle">Subtítulo</Label>
                  <Textarea
                    id="cta-subtitle"
                    value={config.cta.subtitle}
                    onChange={(e) => updateConfig('cta.subtitle', e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="cta-button">Texto do Botão</Label>
                  <Input
                    id="cta-button"
                    value={config.cta.buttonText}
                    onChange={(e) => updateConfig('cta.buttonText', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botão de Salvar */}
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleSave} 
            disabled={loading}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditSite

