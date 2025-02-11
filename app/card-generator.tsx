"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

interface CardAttributes {
  name: string
  type: string
  humanReadableCardType: string
  frameType: string
  desc: string
  race: string
  archetype: string
  Level: string
  atk: string
  def: string
}

// Mock data for generated cards
const mockCards = [
  {
    image: "https://images.ygoprodeck.com/images/cards/89631139.jpg",
    attributes: {
      name: "Blue-Eyes White Dragon",
      type: "MONSTER",
      humanReadableCardType: "Normal Monster",
      frameType: "normal",
      desc: "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",
      race: "Dragon",
      archetype: "Blue-Eyes",
      Level: "8",
      atk: "3000",
      def: "2500",
    },
  },
  {
    image: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
    attributes: {
      name: "Dark Magician",
      type: "MONSTER",
      humanReadableCardType: "Normal Monster",
      frameType: "normal",
      desc: "The ultimate wizard in terms of attack and defense.",
      race: "Spellcaster",
      archetype: "Dark Magician",
      Level: "7",
      atk: "2500",
      def: "2100",
    },
  },
  {
    image: "https://images.ygoprodeck.com/images/cards/44095762.jpg",
    attributes: {
      name: "Mirror Force",
      type: "TRAP",
      humanReadableCardType: "Normal Trap",
      frameType: "trap",
      desc: "When an opponent's monster declares attack: Destroy all your Attack Position monsters.",
      race: "Normal",
      archetype: "",
      Level: "",
      atk: "",
      def: "",
    },
  },
]

export default function CardGenerator() {
  const [prompt, setPrompt] = useState("")
  const [generatedCard, setGeneratedCard] = useState<string | null>(null)
  const [cardAttributes, setCardAttributes] = useState<CardAttributes | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const generateCard = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setGeneratedCard(null)
    setCardAttributes(null)

    // Simulate API call with mock data
    setTimeout(() => {
      const randomCard = mockCards[Math.floor(Math.random() * mockCards.length)]
      setGeneratedCard(randomCard.image)
      setCardAttributes(randomCard.attributes)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={generateCard} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Describe your YuGiOh card</Label>
              <Textarea
                id="prompt"
                placeholder="Enter your card description here. Be as creative and detailed you like!"
                value={prompt}
                onChange={handlePromptChange}
                className="h-40"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Card"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="aspect-[280/400] bg-stone-100 flex items-center justify-center rounded-lg overflow-hidden w-48 sm:w-64 md:w-72 mx-auto dark:bg-stone-800">
              {generatedCard ? (
                <img
                  src={generatedCard || "/placeholder.svg"}
                  alt="Generated YuGiOh Card"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Skeleton className="w-full h-full max-w-[288px] max-h-[412px] mx-auto" />
              )}
            </div>
            <div className="space-y-2">
              {cardAttributes ? (
                <>
                  <h2 className="text-2xl font-bold">{cardAttributes.name}</h2>
                  <p>
                    <strong>Type:</strong> {cardAttributes.humanReadableCardType}
                  </p>
                  <p>
                    <strong>Frame Type:</strong> {cardAttributes.frameType}
                  </p>
                  <p>
                    <strong>Race:</strong> {cardAttributes.race}
                  </p>
                  {cardAttributes.archetype && (
                    <p>
                      <strong>Archetype:</strong> {cardAttributes.archetype}
                    </p>
                  )}
                  {cardAttributes.Level && (
                    <p>
                      <strong>Level:</strong> {cardAttributes.Level}
                    </p>
                  )}
                  {(cardAttributes.atk || cardAttributes.def) && (
                    <p>
                      <strong>ATK/DEF:</strong> {cardAttributes.atk}/{cardAttributes.def}
                    </p>
                  )}
                  <p>
                    <strong>Description:</strong> {cardAttributes.desc}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-20 w-full" />
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

