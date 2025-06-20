"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Scan, Search, Leaf, AlertTriangle, CheckCircle, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import BarcodeScanner from "@/components/barcode-scanner"

// Mock product database
const mockProducts = {
  "123456789012": {
    name: "Organic Bananas",
    brand: "Fresh & Green",
    category: "Fruits",
    carbonFootprint: 0.7,
    sustainabilityScore: "A",
    description: "Organic bananas from sustainable farms",
    image: "/placeholder.svg?height=200&width=200",
    certifications: ["Organic", "Fair Trade"],
    packaging: "Minimal plastic",
    transportDistance: "1,200 km",
  },
  "987654321098": {
    name: "Beef Burger Patties",
    brand: "MeatCo",
    category: "Meat",
    carbonFootprint: 15.2,
    sustainabilityScore: "D",
    description: "Frozen beef burger patties",
    image: "/placeholder.svg?height=200&width=200",
    certifications: [],
    packaging: "Plastic tray with film",
    transportDistance: "800 km",
  },
  "456789123456": {
    name: "Almond Milk",
    brand: "Plant Pure",
    category: "Dairy Alternative",
    carbonFootprint: 1.1,
    sustainabilityScore: "B+",
    description: "Unsweetened almond milk",
    image: "/placeholder.svg?height=200&width=200",
    certifications: ["Organic"],
    packaging: "Recyclable carton",
    transportDistance: "600 km",
  },
}

export default function ScanPage() {
  const [barcode, setBarcode] = useState("")
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const { updateUserStats } = useAuth()
  const { toast } = useToast()

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera if available
      })
      setStream(mediaStream)
      setIsScanning(true)
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to scan barcodes.",
        variant: "destructive",
      })
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsScanning(false)
  }

  const handleScan = async () => {
    if (!barcode.trim()) {
      toast({
        title: "Please enter a barcode",
        description: "Enter a valid barcode to scan the product.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const foundProduct = mockProducts[barcode as keyof typeof mockProducts]

      if (foundProduct) {
        setProduct(foundProduct)
        updateUserStats(foundProduct.carbonFootprint)
        toast({
          title: "Product found!",
          description: `Added ${foundProduct.carbonFootprint}kg CO₂ to your tracking.`,
        })
      } else {
        toast({
          title: "Product not found",
          description: "This barcode is not in our database yet.",
          variant: "destructive",
        })
        setProduct(null)
      }
      setIsLoading(false)
    }, 1000)
  }

  const getSustainabilityColor = (score: string) => {
    switch (score) {
      case "A":
        return "bg-green-100 text-green-800 border-green-200"
      case "B+":
      case "B":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "C":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "D":
      case "F":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCarbonImpact = (footprint: number) => {
    if (footprint < 1) return { level: "Low", icon: CheckCircle, color: "text-green-600" }
    if (footprint < 5) return { level: "Medium", icon: AlertTriangle, color: "text-yellow-600" }
    return { level: "High", icon: AlertTriangle, color: "text-red-600" }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Scan Product</h1>
          <p className="text-gray-400 mt-2">
            Enter or scan a barcode to check the carbon footprint and sustainability score.
          </p>
        </div>

        {/* Scanner Interface */}
        <Card className="dark-card border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Scan className="h-5 w-5" />
              Product Scanner
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter a barcode manually, use your camera to scan, or try the demo barcodes below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="barcode">Barcode</Label>
              <div className="flex gap-2">
                <Input
                  id="barcode"
                  placeholder="Enter barcode (try: 123456789012, 987654321098, 456789123456)"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleScan()}
                />
                <Button onClick={() => setIsScanning(true)} variant="outline">
                  <Camera className="h-4 w-4" />
                </Button>
                <Button onClick={handleScan} disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              <p>
                <strong className="text-gray-300">Try these sample barcodes:</strong>
              </p>
              <ul className="mt-1 space-y-1 text-gray-500">
                <li>• 123456789012 (Organic Bananas - Low impact)</li>
                <li>• 987654321098 (Beef Patties - High impact)</li>
                <li>• 456789123456 (Almond Milk - Medium impact)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Product Results */}
        {product && (
          <Card className="dark-card border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <span>{product.name}</span>
                <Badge className={`${getSustainabilityColor(product.sustainabilityScore)} border`}>
                  Score: {product.sustainabilityScore}
                </Badge>
              </CardTitle>
              <CardDescription>
                {product.brand} • {product.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg bg-gray-100"
                  />
                </div>

                {/* Carbon Footprint */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Carbon Footprint</h3>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const impact = getCarbonImpact(product.carbonFootprint)
                        return (
                          <>
                            <impact.icon className={`h-5 w-5 ${impact.color}`} />
                            <span className="text-2xl font-bold">{product.carbonFootprint} kg CO₂</span>
                            <Badge variant="outline" className={impact.color}>
                              {impact.level} Impact
                            </Badge>
                          </>
                        )
                      })()}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2 text-gray-300">Sustainability Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Transport Distance:</span>
                        <span className="text-gray-300">{product.transportDistance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Packaging:</span>
                        <span className="text-gray-300">{product.packaging}</span>
                      </div>
                    </div>
                  </div>

                  {product.certifications.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-gray-300">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.certifications.map((cert: string) => (
                          <Badge key={cert} variant="secondary" className="bg-green-100 text-green-800">
                            <Leaf className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-gray-300">Description</h4>
                <p className="text-gray-400">{product.description}</p>
              </div>
            </CardContent>
          </Card>
        )}
        {isScanning && (
          <BarcodeScanner
            onScan={(scannedBarcode) => {
              setBarcode(scannedBarcode)
              setIsScanning(false)
              handleScan()
            }}
            onClose={() => setIsScanning(false)}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
