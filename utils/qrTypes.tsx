type QRType = "resident" | "visitor" | "tempVisitor";

type ResidentQR = {
    type: "resident";
    residentId: string;
    timestamp: number;
};

type VisitorQR = {
    type: "visitor";
    visitorId: string;
    timestamp: number;
};

type TempVisitorQR = {
    type: "tempVisitor";
    timestamp: number;
    data: {
        name: string;
        phoneNumber: string;
        purpose: string;
        timeIn: number;
        timeOut?: number;
    };
};

export type { QRType, ResidentQR, VisitorQR, TempVisitorQR };
