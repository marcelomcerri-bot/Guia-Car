import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import Guias from "@/pages/guias";
import GuiaDetalhe from "@/pages/guia-detalhe";
import Diagnostico from "@/pages/diagnostico";
import DiagnosticoResultado from "@/pages/diagnostico-resultado";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/guias" component={Guias} />
        <Route path="/guias/:id" component={GuiaDetalhe} />
        <Route path="/diagnostico" component={Diagnostico} />
        <Route path="/diagnostico/resultado/:id" component={DiagnosticoResultado} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
