// export type gistsType

export type getGistsParamType = {
    page : number;
    func : 'getGists' | 'starredGists'
    accessToken ?: string;
} 

export type gistsSliceType = {
    status : string
    error  : string | null
    gists  : gistType[]
    searchQuery : string;
    page  : number
}
export type gistsType = gistType[];

export interface gistType {
    url: string
    forks_url: string
    commits_url: string
    id: string
    node_id: string
    git_pull_url: string
    git_push_url: string
    html_url: string
    files: any
    public: boolean
    created_at: string
    updated_at: string
    description?: string
    comments: number
    user: any
    comments_url: string
    owner: Owner
    truncated: boolean
}

export interface Owner {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
