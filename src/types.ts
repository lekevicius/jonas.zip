export type ServiceKey =
  | 'bluesky'
  | 'discord'
  | 'dribbble'
  | 'email'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'letterboxd'
  | 'linkedin'
  | 'mastodon'
  | 'medium'
  | 'messenger'
  | 'pinterest'
  | 'reddit'
  | 'signal'
  | 'speakerdeck'
  | 'substack'
  | 'telegram'
  | 'threads'
  | 'tiktok'
  | 'twitch'
  | 'twitter'
  | 'x'
  | 'youtube'

export type EmailService = {
  service: 'email'
  email: string
  tooltip?: string
  tooltipCopied?: string
}

export type LinkService = {
  service: 'signal' | 'mastodon' | 'discord'
  link: string
  tooltip?: string
}

export type UsernameService = {
  service: Exclude<ServiceKey, 'email' | LinkService['service']>
  username: string
  tooltip?: string
}

export type Service = EmailService | LinkService | UsernameService

export type ServiceLinksBlock = {
  type: 'service-links'
  services: Service[]
}
export type NewsletterBlock = {
  type: 'newsletter'
  action: string
  title?: string
  description?: string
}
export type LinkBlockWithIcon = {
  type: 'link'
  url: string
  title?: string
  description?: string
  icon?: ServiceKey
}

export type LinkBlockWithImage = {
  type: 'link'
  url: string
  title?: string
  description?: string
  image?: string
}

export type LinkBlock = LinkBlockWithIcon | LinkBlockWithImage

export type SiteBlock = NewsletterBlock | LinkBlock | ServiceLinksBlock

export type SiteData = {
  url: string
  title: string
  description?: string
  image?: string
  fields?: {
    occupation?: string
    location?: string
  }
  theme?: {
    color?: string
    colorDark?: string
    favicon?: string
    shareImage?: string
    headerDecoration?: boolean
    monogramElement?: string
  }
  build?: {
    trackingScript?: string
  }
  blocks: SiteBlock[]
}
