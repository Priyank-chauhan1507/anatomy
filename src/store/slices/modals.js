import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    colorCodedLegendModal: {
        state: false,
    },
    stringToNameTranslatorModal: {
        state: false,
    },
    siteNameToCodeTranslatorModal: {
        state: false,
    },
    snsModal: {
        state: false,
    },
    nameBuilderModal: {
        state: false,
        data: {
            itemId: "",
        },
    },
    pinDescriptionModal: {
        state: false,
        data: {
            itemId: "",
        },
    },
    exportTextListModal: {
        state: false,
    },
    exportZipModal: {
        state: false,
    },
    clinicInfoModdal: {
        state: false
    },
    linkEditor: {
        state: false,
        data: {
            itemId: "",
            isGrouped: false,
            listType: "",
            listSubtype: "",
        },
    },
    itemImage: {
        state: false,
        data: {
            itemId: "",
            index: -1,
        },
    },
    fileNameBuilder: {
        state: false,
    },
    folderNameBuilder: {
        state: false,
    },
    qrBuilderModal: {
        state: false,
        data: {
            listType: "",
            listSubtype: "",
            title: "",
        },
    },

    sessionGalleryModal: {
        state: false,
        data: {
            files: "",
            itemId: "",
            listType: ""
        },
    },

    linkGalleryModal: {
        state: false,
        data: {
            itemId: "",
        }
    },

    icd: {
        state: false,
        data: {
            itemId: "",
            isGrouped: false,
            listType: '',
            listSubtype: '',
        },
    },
    copiedImg: {
        state: null
    },
    deleteImg: {
        state: false
    },
    contextMenu: {
        activeItemId: '',
        state: false
    }
};

export const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        toggleColorCodedLegendModal: (state) => {
            state.colorCodedLegendModal.state = !state.colorCodedLegendModal.state;
        },
        toggleSNSModal: (state) => {
            state.snsModal.state = !state.snsModal.state;
        },
        toggleContextMenu: (state, action) => {
            state.contextMenu.state = !state.contextMenu.state
            const { id } = action.payload
            if (id) {
                state.contextMenu.activeItemId = id
            } else {
                state.contextMenu.activeItemId = ''
            }
        },
        toggleStringToNameTranslatorModal: (state) => {
            state.stringToNameTranslatorModal.state = !state.stringToNameTranslatorModal.state;
        },
        toggleSiteNameToCodeTranslatorModal: (state) => {
            state.siteNameToCodeTranslatorModal.state = !state.siteNameToCodeTranslatorModal.state;
        },
        toggleExportTextListModal: (state) => {
            state.exportTextListModal.state = !state.exportTextListModal.state;
        },
        toggleExportZipModal: (state) => {
            state.exportZipModal.state = !state.exportZipModal.state;
        },

        openPinDescriptionModal: (state, action) => {
            const itemId = action.payload;
            state.pinDescriptionModal.data.itemId = itemId;
            state.pinDescriptionModal.state = true;
        },
        closePinDescriptionModal: (state) => {
            state.pinDescriptionModal = initialState.pinDescriptionModal;
        },
        openNameBuilderModal: (state, action) => {
            const itemId = action.payload;
            state.nameBuilderModal.state = true;
            state.nameBuilderModal.data.itemId = itemId;
        },
        closeNameBuilderModal: (state) => {
            state.nameBuilderModal = initialState.nameBuilderModal;
        },
        toggleClinicInfoModal: (state) => {
            state.clinicInfoModdal.state = !state.clinicInfoModdal.state
        },

        openLinkEditor: (state, action) => {
            const { itemId, isGrouped, listType, listSubtype, to } = action.payload;
            state.linkEditor.data = {
                itemId,
                isGrouped,
                listType,
                listSubtype,
                to
            };

            state.linkEditor.state = true;
        },
        closeLinkEditor: (state) => {
            state.linkEditor = initialState.linkEditor;
        },

        openFileNameBuilder: (state) => {
            state.fileNameBuilder.state = true;
        },

        closeFileNameBuilder: (state) => {
            state.fileNameBuilder = initialState.fileNameBuilder;
        },
        openFolderNameBuilder: (state) => {
            state.folderNameBuilder.state = true;
        },

        closeFolderNameBuilder: (state) => {
            state.folderNameBuilder = initialState.folderNameBuilder;
        },

        openItemImageModal: (state, action) => {
            const { itemId, index } = action.payload;
            state.itemImage.data = {
                itemId,
                index,
            };
            state.itemImage.state = true;
        },
        closeItemImageModal: (state, action) => {
            state.itemImage = initialState.itemImage;
        },
        openDeleteModal: (state, action) => {
            state.deleteImg.state = true;
        },
        closeDeleteModal: (state, action) => {
            state.deleteImg = initialState.deleteImg;
        },

        openICDModal: (state, action) => {
            const { itemId, isGrouped, listSubtype, listType } = action.payload;
            state.icd.data = {
                itemId,
                isGrouped,
                listSubtype,
                listType
            };
            state.icd.state = true;
        },
        closeICDModal: (state, action) => {
            state.icd = initialState.icd;
        },

        openQrBuilderModal: (state, action) => {
            const { listType, listSubtype, title } = action.payload;
            state.qrBuilderModal.data = {
                listType,
                listSubtype,
                title
            };
            state.qrBuilderModal.state = true;
        },
        closeQrBuilderModal: (state, action) => {
            state.qrBuilderModal = initialState.qrBuilderModal;
        },
        openSessionGalleryModal: (state, action) => {
            const { itemId, listType } = action.payload;
            state.sessionGalleryModal.data = { itemId, listType }
            state.sessionGalleryModal.state = true;
        },
        closeSessionGalleryModal: (state, action) => {
            state.sessionGalleryModal = initialState.sessionGalleryModal;
        },
        openLinkGalleryModal: (state, action) => {
            const { itemId } = action.payload;
            state.linkGalleryModal.data = { itemId }
            state.linkGalleryModal.state = true;
        },
        closeLinkGalleryModal: (state, action) => {
            state.linkGalleryModal = initialState.linkGalleryModal;
        },
        copyImg: (state, action) => {
            state.copiedImg = action.payload;
        }
    },
});

export const {
    toggleColorCodedLegendModal,
    toggleSNSModal,
    toggleStringToNameTranslatorModal,
    toggleSiteNameToCodeTranslatorModal,
    openNameBuilderModal,
    toggleExportTextListModal,
    toggleExportZipModal,
    closeNameBuilderModal,
    openPinDescriptionModal,
    closePinDescriptionModal,
    toggleClinicInfoModal,
    openLinkEditor,
    closeLinkEditor,
    openFileNameBuilder,
    closeFileNameBuilder,
    openFolderNameBuilder,
    closeFolderNameBuilder,
    openItemImageModal,
    closeItemImageModal,
    openICDModal,
    closeICDModal,
    openQrBuilderModal,
    closeQrBuilderModal,
    copyImg,
    openDeleteModal,
    closeDeleteModal,
    openSessionGalleryModal,
    closeSessionGalleryModal,
    openLinkGalleryModal,
    closeLinkGalleryModal,
    toggleContextMenu

} = modalsSlice.actions;

export default modalsSlice.reducer;