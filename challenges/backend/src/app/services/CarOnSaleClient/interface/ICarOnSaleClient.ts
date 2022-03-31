// TODO: mark optional attributes + double check
interface IVehicleTechStateIVehicleTechState{
    part: number,
    state: number,
    description: string,
    _fk_uuid_vehicle: string,
    uuid: string,
    updatedAt?: string,
    deletedAt?: string,
    createdAt?: string
}
interface IVehiclePaintStateIVehiclePaintState{
    part: number,
    value: number
}

interface IVehicleTireDetailsIVehicleTireDetails{
    condition: number
}
interface IVehicleTireSet{
    isInstalled: boolean,
    type: number,
    rim: number,
    details: IVehicleTireDetailsIVehicleTireDetails[],
    size: string,
    flawDescription: string,
}
interface IVehicleImageIVehicleImage{
    perspective: number,
    _fk_uuid_vehicle: string,
    mimeType: string,
    encoding: string,
    rawData: Record<string, any>,
    url: string,
    uuid: string,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string
}

interface IVehicleEquipmentHighlightDataIVehicleEquipmentHighlightData{
    externalId: string,
    rank: number,
    description: string,
    category: number,
    uuid: string,
}
interface IVehicleEquipmentDataIVehicleEquipmentData{
    externalId: string,
    externalGroup: string,
    description: string,
    type: number,
    uuid: string
}

interface IVehicleDamage{
    location:	number,
    types:	number[],
    description?: string
    urlToImage: string,
    _fk_uuid_vehicle: string,
    deletedAt: string
    id:	number,
    uuid: string,
}
interface IFile {
    mimeType: string,
    encoding: string,
    rawData: Record<string, any>,
    url:	string
}

interface IFieldConfirmationStatusIFieldConfirmationStatus{
    value: Record<string, any>,
    initValue: Record<string, any>,
    confirmed: boolean

}
interface IVehicleFieldConfirmationStatusMap{
    euroNorm: IFieldConfirmationStatusIFieldConfirmationStatus,
    numSeats: IFieldConfirmationStatusIFieldConfirmationStatus,
    category: IFieldConfirmationStatusIFieldConfirmationStatus,
    ac: IFieldConfirmationStatusIFieldConfirmationStatus,
    coupling: IFieldConfirmationStatusIFieldConfirmationStatus,
    navigation: IFieldConfirmationStatusIFieldConfirmationStatus,
    parkingAssistance: IFieldConfirmationStatusIFieldConfirmationStatus,
    headlights: IFieldConfirmationStatusIFieldConfirmationStatus,
    sunRoof: IFieldConfirmationStatusIFieldConfirmationStatus,
    vehicleHeater: IFieldConfirmationStatusIFieldConfirmationStatus,
}
interface IVehicle{
    id: number,
    ez: string,
    make: string,
    mileageInKm: number,
    model: string,
    vin: string,
    hadAccident: boolean,
    accidentDescription: string,
    category: number,
    doors: number,
    enginePowerInHp: number,
    engineSizeInCcm: number,
    fuelType: number,
    transmission: number,
    upholstery: number,
    ac: number,
    coupling: number,
    headlights: number,
    navigation: number,
    parkingAssistance: number,
    sportPackage: number,
    sunRoof: number,
    vehicleHeater: number,
    huReportExists: boolean,
    lastHu: string,
    numKeys: number,
    numPreOwners: number,
    vatIdReportable: boolean,
    urlToAttachment1: string,
    urlToAttachment2: string,
    urlToAttachment3: string,
    additionalDamages: string,
    urlToVehicleSummarySheet: string,
    euroNorm: string,
    dimensionWidthInCm: number,
    dimensionHeightInCm: number,
    dimensionLengthInCm: number,
    unloadedWeightInKg: number,
    numSeats: number,
    isReimportedVehicle: boolean,
    datBaseModelRaw: string,
    uuid: string,
    origin: number,
    dataSource: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    lastServiceInspectionDate: string,
    lastServiceInspectionMileage: number,
    isCocDocumentAvailable: boolean,
    countryOfLastRegistration: string,
    bodyColorCode: number,
    readyToDrive: number,
    readyToDriveDetails: string,
    hasDamages: boolean,
    damagesDescription: string,
    additionalInfo: string,
    dataWarnings: number[],
    serviceHistoryAvailability: number,
    fullServiceHistoryType: number,
    hasMaintenanceBook: boolean,
    fieldsConfirmationStatus: IVehicleFieldConfirmationStatusMap,
    licensePlate: string,
    urlToMotorSound?: string,
    attachments: IFile[],
    damages: IVehicleDamage[],
    equipmentData: IVehicleEquipmentDataIVehicleEquipmentData[],
    equipmentHighlights: IVehicleEquipmentHighlightDataIVehicleEquipmentHighlightData,
    vehicleImages: IVehicleImageIVehicleImage[],
    tires: IVehicleTireSet[],
    paintState: IVehiclePaintStateIVehiclePaintState[],
    technicalState: IVehicleTechStateIVehicleTechState[]
}

interface ISellerAccountFlags{
    shouldApplyStandingCosts: boolean
}
export interface IRunningAuctions {
    id: number,
    label: string,
    endingTime: string,
    state: number, //
    minimumRequiredAsk: number,
    currentHighestBidValue: number,
    numBids: number,
    locationAddress: string,
    locationCity: string,
    locationZip: string,
    startedAt: string,
    createdAt?: string,
    updatedAt?: string,
    hotBid: boolean,
    originalMinimumRequiredAsk: number,
    allowInstantPurchase: boolean,
    instantPurchasePossibleUntil: string,
    advertisementHtmlContent: string,
    instantPurchasePrice: number,
    locationCountryCode: string,
    startingBidValue: number,
    uuid: string,
    _fk_uuid_vehicle: string,
    _fk_uuid_sellerUser: string,
    _fk_uuid_highestBiddingBuyerUser: string,
    urlToPickupBuyerDocument: string,
    paymentProcess: number,
    type: number,
    _fk_uuid_creatingSellerUser: string,
    isTest: boolean,
    displayMinAsk: boolean,
    isLive: boolean,
    isTransportationDisabledManually: boolean,
    startingBidValueNet: number,
    minimumRequiredAskNet: number,
    originalMinimumRequiredAskNet: number,
    purchasePriceNet: number,
    currentHighestBidValueNet: number,
    highestBidValueAtEndingTimeNet: number,
    instantPurchasePriceNet: number,
    lastOfferBySellerNet: number,
    previousLastOfferBySellerNet: number,
    counterOfferByBuyerNet: number,
    previousCounterOfferByBuyerNet: number,
    renegotiationMidpointValueNet: number,
    pickupInstructions: string,
    thirdPartyVATDepositTransferReference: string,
    thirdPartyVATDepositChargeReference: string,
    preventSellerFactoring: boolean,
    listingSurchargeFeeInvoiceReference: string,
    additionalTaxType: number,
    additionalTaxValue: number,
    isVATReportable: boolean,
    thirdPartyAdditionalTaxRefundReference: string,
    uploadMethod: number,
    amIInvolved: boolean,
    biddingAgentValue: number,
    remainingTimeInSeconds: number,
    remainingTimeForInstantPurchaseInSeconds: number,
    associatedVehicle: IVehicle,
    amIHighestBidder: boolean,
    sellerContact: string,  // null - NA
    rating: string, // null - NA
    isTransportationAllowedForRegion: boolean,
    isExternalPaymentAllowed: string,
    remainingDaysUntilReauctioning: number, // null - NA
    remainingDaysUntilLatePickup: number, // null = NA
    latePickupFee: number, // null - NA
    isTransportationBookingPossible: boolean,
    isExpressPickupAvailable: boolean,
    pickupPossibleInDays: boolean, // null - NA
    sellerAccount: ISellerAccountFlags, // TODO: better name for this interface
    amIRegularBuyer: boolean,
    isCrossBorderNetSale: boolean,
    distanceToVehicleInKms: number,
    buyerPurchaseFee: number,
    buyerSuccessFee: number,
    vatAmount: number,
    vatRate: number,
    isMinAskReached: boolean,
    transportationTask: string, // null - NA
    sellerType: number,
    enforceTransportation: boolean,
    isTransportationAvailable: boolean,
}

export interface IRunningAuctionsResult {
    items: IRunningAuctions[],
    page: number,
    total: number
}

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    getRunningAuctions(credentials:{
        userId: string,
        password: string
    }): Promise<IRunningAuctionsResult>

}
