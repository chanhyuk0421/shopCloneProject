
import { Inter } from "next/font/google";
import "./globals.css";
import { Registry as StyledComponetRegistry } from "@/style/registry";
import Header from "@/components/Header";
import { AuthContextProvider } from "@/context/authContext";
import { Provider } from "@/context/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
  return (
    <Provider>
      <AuthContextProvider>
        <html lang="ko">     
          
          <body className={inter.className}>
            <Header/>
            <StyledComponetRegistry>
              {children}
            </StyledComponetRegistry>    
          
          </body>
        </html>
      </AuthContextProvider>
    </Provider>
    
  );
}

/*
서버 랜더링 구성요소가 html에서 스트리밍되기 때문에 공급자와 컨텍스트가 서버 랜더링 구성요소에서 
직접적으로 사용되는 것을 허용하지 않는다

*스트리밍
서버에서 클라이언트로 데이터가 조금씩 넘어오는 것을 스트리밍 이라고 한다. 

서버에서 생성되는 html요소들이 클라이언트로 부분적으로 전송되기 시작하면 전체요소들이 완성되기 전에
일부 html이 전송되어서 미완성된 페이지를 출력하거나 값이 나올수도 있다.

그래서 next14 버전 부터는 provider와 context를 직접적으로 사용하지 않고, 클라이언트에서 
처리하는 방식으로 변경해야 한다. 

서버는 페이지의 기본적인 구조만 만들어서 보내고 나머지 세부 설정은 각 사용자의 브라우저에서 처리 하도록
하는 방식을 next가 가지고 있다. (서버의 부담도, 사용자 경험도 증가되는 효과)

layout.js에  
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}></QueryClientProvider> 
로 사용하지 말 것



*/