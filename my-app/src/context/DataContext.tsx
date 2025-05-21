import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define los tipos para tus datos. Puedes mejorar estos tipos más adelante si sabes sus estructuras exactas
type DataType = unknown; // O reemplaza 'any' por tipos reales como: `UserProfile`, `Establishment[]`, etc.

interface DataContextType {
  profileData: DataType;
  setProfileData: (data: DataType) => void;
  establishmentsData: DataType;
  setEstablishmentsData: (data: DataType) => void;
  peopleFlowData: DataType;
  setPeopleFlowData: (data: DataType) => void;
  reportsData: DataType;
  setReportsData: (data: DataType) => void;
  restrictedAreaData: DataType;
  setRestrictedAreaData: (data: DataType) => void;
  faceRecognitionData: DataType;
  setFaceRecognitionData: (data: DataType) => void;
  cashierAlertsData: DataType;
  setCashierAlertsData: (data: DataType) => void;
  weaponsAlertsData: DataType;
  setWeaponsAlertsData: (data: DataType) => void;
  clearData: () => void;
}

// 2. Crea el contexto con tipo null inicial para manejo seguro
const DataContext = createContext<DataContextType | null>(null);

// 3. Hook personalizado para acceder al contexto de forma segura
export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

// 4. Implementación del proveedor
export const DataProvider = ({ children }: DataProviderProps) => {
  const [profileData, setProfileData] = useState<DataType>(null);
  const [establishmentsData, setEstablishmentsData] = useState<DataType>(null);
  const [peopleFlowData, setPeopleFlowData] = useState<DataType>(null);
  const [reportsData, setReportsData] = useState<DataType>(null);
  const [restrictedAreaData, setRestrictedAreaData] = useState<DataType>(null);
  const [faceRecognitionData, setFaceRecognitionData] =
    useState<DataType>(null);
  const [cashierAlertsData, setCashierAlertsData] = useState<DataType>(null);
  const [weaponsAlertsData, setWeaponsAlertsData] = useState<DataType>(null);

  const clearData = () => {
    setProfileData(null);
    setEstablishmentsData(null);
    setPeopleFlowData(null);
    setReportsData(null);
    setRestrictedAreaData(null);
    setFaceRecognitionData(null);
    setCashierAlertsData(null);
    setWeaponsAlertsData(null);
  };

  return (
    <DataContext.Provider
      value={{
        profileData,
        setProfileData,
        establishmentsData,
        setEstablishmentsData,
        peopleFlowData,
        setPeopleFlowData,
        reportsData,
        setReportsData,
        restrictedAreaData,
        setRestrictedAreaData,
        faceRecognitionData,
        setFaceRecognitionData,
        cashierAlertsData,
        setCashierAlertsData,
        weaponsAlertsData,
        setWeaponsAlertsData,
        clearData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
