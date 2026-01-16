"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Calendar, Stethoscope, Star, MapPin, Clock } from "lucide-react"

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
    <div className="flex flex-col h-full bg-white w-full">
      {/* Header */}
      <div className="flex-shrink-0 text-center p-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">For You</h1>
        <p className="text-gray-600">Curated resources for your wellness journey</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 w-full">
        {/* Curated Marketplace */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingBag className="w-4 h-4 text-purple-500" />
              Marketplace
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {marketplaceItems.map((item, index) => (
                <div key={index} className="flex gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="text-2xl flex-shrink-0">{item.image}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.brand}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-semibold text-gray-900">{item.price}</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-3 h-9 text-sm">
              <ShoppingBag className="w-3 h-3 mr-1" />
              Browse All
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4 text-blue-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-2.5 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 line-clamp-1">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.type}</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
                      {event.attendees}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <Clock className="w-3 h-3" />
                    {event.date}
                  </div>
                  <Button size="sm" className="w-full h-8 text-xs">
                    Join Event
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctors Directory */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Stethoscope className="w-4 h-4 text-red-500" />
              Doctors
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {doctors.map((doctor, index) => (
                <div key={index} className="p-2.5 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-xs text-gray-500">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-xs flex-shrink-0">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {doctor.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <MapPin className="w-3 h-3" />
                    {doctor.location} • {doctor.distance}
                  </div>
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs"
                    disabled={!doctor.accepting}
                    variant={doctor.accepting ? "default" : "outline"}
                  >
                    {doctor.accepting ? "Notify Me" : "Closed"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
