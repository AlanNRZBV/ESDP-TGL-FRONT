export interface ShipmentData {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  userMarketId: number;
  pupId: {
    _id: string;
    name: string;
    address: string;
    settlement: string;
    region: string;
    phoneNumber: string;
  };
  status: string;
  dimensions: {
    height: number;
    width: number;
    length: number;
  };
  weight: number;
  delivery: {
    status: boolean;
    date: string;
    address: string;
    phoneNumber: string;
  };
  price: {
    usd: number;
    som: number;
  };
  trackerNumber: number;
  isPaid: boolean;
  datetime: string;
}

export interface ShipmentStatusData {
  _id: string;
  status: string;
  isPaid: boolean;
}

export interface Shipment {
  _id: string;
  status: string;
  pupId: {
    _id: string;
    name: string;
    address: string;
    settlement: string;
    region: string;
    phoneNumber: string;
  };
  price: {
    usd: number;
    som: number;
  };
  delivery: {
    status: boolean;
    date: string;
    address: string;
    phoneNumber: string;
  };
  trackerNumber: number;
}

export interface ShipmentThatDone {
  _id?: string;
  pupId: {
    _id: string;
    name: string;
    address: string;
    settlement: string;
    region: string;
    phoneNumber: string;
  };
  price: {
    usd: number;
    som: number;
  };
  trackerNumber: number;
  datetime: string;
}

export interface ShipmentMutation {
  userMarketId: string;
  trackerNumber: string;
  weight: string;
  pupId: string;
  status: string;
  dimensions: {
    height: string;
    width: string;
    length: string;
  };
}

export interface ShipmentQueryArgs {
  region?: string;
  datetime?: string;
  pupId?: string;
}

export interface ShipmentsResponse {
  message: string;
  shipments: ShipmentData[];
}

export interface oneShipmentResponse {
  message: string;
  shipment: ShipmentData;
}

export interface UpdateShipmentArg {
  shipmentId: string;
  shipmentMutation: ShipmentMutation;
}
