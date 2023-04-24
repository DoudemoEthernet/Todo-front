import { UseFetch } from 'use-http'
import { getCookie, setCookie } from 'typescript-cookie'

export interface AccountInfo {
  user: string
  password: string
}

interface TokenInfo {
  token: string
  expr: number
}

const COOKIE_TOKEN_KEY = 'token'

const SLUG_SIGNUP = '/account/signup'
const SLUG_LOGIN = '/account/login'

/**
 * {@typedef AccountInfo}情報を基にアカウント作成を試行します
 *
 * @example
 * アカウント作成を試行し、成功すれば`success`,失敗すれば`failed. statusCode: {number}`とweb上に表示する簡単な例
 * ```ts
 * const [result, setResult] = useState("logging in...")
 *
 * const accountInfo: AccountInfo = {
 *   user: "username"
 *   password: "*********"
 * };
 * const fetch = useFetch("http://localhost:8003");
 * // 通常の関数内で呼ぶ場合はuseEffect内で呼ばないと複数回実行される可能性がある
 * // 実際はloginボタンのonClickなどで呼ぶと思うのでその際は気にしなくてok
 * useEffect(() => {
 *  trySignup(accountInfo, fetch)
 *     .then(() => {setResult("ok");})
 *     .catch(e => {
 *       console.error(e);
 *       setResult(`failed. statusCode: ${fetch.response.status}`);
 *      });
 * }, []);
 *
 * return <>
 *   <p>{result}</p>
 *   <>;
 * ```
 *
 * @param accountInfo アカウント情報
 * @param useFetch 対象のサーバーurlを与えたuseFetch 上の例参照
 */
export const trySignup = async (
  accountInfo: AccountInfo,
  useFetch: UseFetch<TokenInfo>,
): Promise<void> => {
  const result = await useFetch.post(SLUG_SIGNUP, accountInfo)
  setTokenInCookie(result)
}

/**
 * {@typedef AccountInfo}情報を基にログインを試行します
 *
 * 使い方は trySignup()と同じ
 *
 * @param accountInfo アカウント情報
 * @param useFetch 対象のサーバーurlを与えたuseFetch 上の例参照
 */
export const tryLogin = async (
  accountInfo: AccountInfo,
  useFetch: UseFetch<TokenInfo>,
): Promise<void> => {
  const result = await useFetch.post(SLUG_LOGIN, accountInfo)
  setTokenInCookie(result)
}

/**
 * トークンを取得します
 * 有効期限が切れているなどでundefinedが返される可能性に注意してください
 */
export const getToken = (): string | undefined => getCookie(COOKIE_TOKEN_KEY)

/**
 * トークンを所持しているかを確認します
 */
export const hasToken = (): boolean => getCookie(COOKIE_TOKEN_KEY) !== undefined

const setTokenInCookie = (info: TokenInfo) => {
  const isDebugMode = process.env.NODE_ENV === 'development'
  setCookie(COOKIE_TOKEN_KEY, info.token, {
    expires: new Date(info.expr),
    secure: !isDebugMode,
    sameSite: 'strict',
  })
}
