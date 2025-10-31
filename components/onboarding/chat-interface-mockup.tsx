import { Send, Heart } from "lucide-react"

export function ChatInterfaceMockup() {
  return (
    <div className="w-full bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center p-6 h-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-4 border border-purple-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Empress</h3>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-[80%]">
              <p className="text-sm text-gray-800">I've been feeling anxious about my symptoms lately...</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl rounded-tr-md px-4 py-2 max-w-[80%]">
              <p className="text-sm">
                I understand how overwhelming this can feel. Let's talk through what you're experiencing. What specific
                symptoms are causing you the most concern?
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-[80%]">
              <p className="text-sm text-gray-800">Mainly hot flashes and sleep issues...</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-500"
            disabled
          />
          <button className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
