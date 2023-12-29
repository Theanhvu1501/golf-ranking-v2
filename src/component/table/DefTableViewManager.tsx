import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { DefTableColumnsType } from "./columns";

interface View {
  name: string;
  columns: (string | number)[];
}

interface DefTableViewManagerCtxData<T> {
  currentView: string;
  views: View[];
  setView: (view: View) => void;
  columns: DefTableColumnsType<T>;
}

const Ctx = createContext<DefTableViewManagerCtxData<unknown>>(
  {} as DefTableViewManagerCtxData<unknown>
);

interface Props {
  initView: string;
  views: View[];
  columns: DefTableColumnsType<any>;
  children: React.ReactNode;
}

export const DefTableViewManagerProvider: FC<Props> = ({
  initView,
  views,
  columns,
  children,
}) => {
  const [currentView, setCurrentView] = useState<string>(initView);

  const setView = useCallback((view: View) => {
    setCurrentView(view.name);
  }, []);

  const ctxData = useMemo<DefTableViewManagerCtxData<unknown>>(() => {
    return {
      currentView,
      views,
      columns,
      setView,
    };
  }, [columns, currentView, setView, views]);

  return <Ctx.Provider value={ctxData}>{children}</Ctx.Provider>;
};

export function useDefTableViewManager<T>() {
  return useContext(Ctx) as DefTableViewManagerCtxData<T>;
}

interface ViewNavigatorProps {
  renderNavigator(
    view: View,
    isCurrentView: boolean,
    changeToView: VoidFunction
  ): JSX.Element;
  className?: string;
}

export const ViewNavigator: FC<ViewNavigatorProps> = ({
  renderNavigator,
  className,
}) => {
  const { views, currentView, setView } = useDefTableViewManager();

  return (
    <div className={className}>
      {views.map((view) =>
        renderNavigator(view, view.name === currentView, () => {
          setView(view);
        })
      )}
    </div>
  );
};
