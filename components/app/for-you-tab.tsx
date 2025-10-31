import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Calendar, Users, Stethoscope, Star, MapPin, Clock, Bell, ExternalLink, Video } from "lucide-react"

export function ForYouTab() {
  const marketplaceItems = [
    {
      name: "Evening Primrose Oil",
      brand: "Nature's Best",
      price: "$24.99",
      rating: 4.8,
      image: "🌿",
      category: "Supplements",
    },
    {
      name: "Cooling Pillow",
      brand: "SleepWell",
      price: "$89.99",
      rating: 4.6,
      image: "🛏️",
      category: "Sleep",
    },
    {
      name: "Hormone Balance Tea",
      brand: "Herbal Harmony",
      price: "$18.99",
      rating: 4.9,
      image: "🍵",
      category: "Wellness",
    },
  ]

  const upcomingEvents = [
    {
      title: "Managing Hot Flashes Naturally",
      type: "Expert AMA",
      date: "Today, 7:00 PM",
      attendees: 24,
      expert: "Dr. Sarah Chen",
    },
    {
      title: "Perimenopause Support Circle",
      type: "Micro-Pod",
      date: "Tomorrow, 2:00 PM",
      attendees: 8,
      expert: "Facilitated Group",
    },
    {
      title: "Nutrition for Menopause",
      type: "Workshop",
      date: "Friday, 6:00 PM",
      attendees: 45,
      expert: "Nutritionist Lisa Park",
    },
  ]

  const doctors = [
    {
      name: "Dr. Maria Rodriguez",
      specialty: "Gynecology & Menopause",
      location: "New York, NY",
      rating: 4.9,
      distance: "2.3 miles",
      accepting: true,
    },
    {
      name: "Dr. Jennifer Kim",
      specialty: "Endocrinology",
      location: "Brooklyn, NY",
      rating: 4.8,
      distance: "5.1 miles",
      accepting: false,
    },
    {
      name: "Dr. Amanda Foster",
      specialty: "Integrative Medicine",
      location: "Manhattan, NY",
      rating: 4.7,
      distance: "3.8 miles",
      accepting: true,
    },
  ]

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 text-center p-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">For You</h1>
        <p className="text-gray-600">Curated resources for your wellness journey</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Curated Marketplace */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-500" />
              Curated Marketplace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {marketplaceItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                >
                  <div className="text-3xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{item.price}</div>
                    <Button size="sm" className="mt-2">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Buy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Products
            </Button>
          </CardContent>
        </Card>

        {/* Micro-Pods & Live Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.expert}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{event.type}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees} attending
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Video className="w-4 h-4 mr-2" />
                      Join Event
                    </Button>
                    <Button size="sm" variant="outline">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctors Directory Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-green-500" />
              Doctors Directory
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full ml-2">Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doctors.map((doctor, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {doctor.location} • {doctor.distance}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          doctor.accepting ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doctor.accepting ? "Accepting patients" : "Not accepting"}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 bg-transparent"
                    disabled={!doctor.accepting}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    {doctor.accepting ? "Contact Doctor" : "Notify Me When Available"}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800 text-center">
                Full directory access coming soon! Get notified when it launches.
              </p>
              <Button
                variant="outline"
                className="w-full mt-2 border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notify Me
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
