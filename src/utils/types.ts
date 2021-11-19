export type loginInfo = {
  username: string
  password: string
}

export type InputInfo = {
  label: string
  name?: string
  type?: string
  classes?: string[]
  required?: boolean
}

export type FieldsetInfo = {
  legend: string
  inputs: (string | InputInfo)[]
  includeSubmit?: boolean
}

export type GameEntry = {
  id: number
  name: string
  image_url?: string
  min_players: number
  max_players: number
  min_playtime: number
  max_playtime: number
  notes?: string
  user_id: number
}

export type BoardGameAtlasGameData = {
  id: string
  name: string
  handle: string
  url: string
  edit_url: string
  price: string
  price_ca: string
  price_uk: string
  price_au: string
  msrp: number
  msrps: {country: string, price: number}[]
  discount: string
  min_players: number
  max_players: number
  min_playtime: number
  max_playtime: number
  min_age: number
  description: string
  commentary: string
  faq: string,
  thumb_url: string
  image_url: string
  matches_specs: boolean | null
  specs: string[]
  mechanics: {id: string}[]
  categories: {id: string}[]
  related_to: any[]
  developers: any[]
  artists: string[]
  designers: {id: string}[]
  publishers: {id: string}[]
  primary_publisher: {name: string, id: string, url: string}
  primary_designer: {name: string, id: string, url: string}
  names: string[]
  tags: string[]
  publisher: string
  rules_url: string | null
  amazon_rank: number
  official_url: string | null
  comment_count: number
  num_user_ratings: number
  average_user_rating: number
  historical_low_prices: {
    country: string,
    date: {__type: string, iso: string},
    price: number,
    isLow: boolean
  }[]
  active: boolean
  num_user_complexity_votes: number
  average_learning_complexity: number
  average_strategy_complexity: number
  visits: number
  lists: number
  plays: number
  mentions: number
  links: number
  rank: number
  type: string
  num_distributors: number
  trending_rank: number
  listing_clicks: number
  is_historical_low: boolean
  year_published: number
  price_text: string
  images: {thumb: string, small: string, medium: string, large: string, original: string}
  description_preview: string

}