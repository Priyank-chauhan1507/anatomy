import React, { useState } from 'react'
import { Worker } from '@react-pdf-viewer/core';
// Import the main viewer component
import { Viewer, LocalizationMap, LocalizationContext } from '@react-pdf-viewer/core';
import { localeSwitcherPlugin } from '@react-pdf-viewer/locale-switcher';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';




import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import de_DE from '@react-pdf-viewer/locales/lib/de_DE.json';
import vi_VN from '@react-pdf-viewer/locales/lib/vi_VN.json';
import ar_AE from '@react-pdf-viewer/locales/lib/ar_AE.json';
import en_US from '@react-pdf-viewer/locales/lib/en_US.json';
import es_ES from '@react-pdf-viewer/locales/lib/es_ES.json';
import fr_Fr from '@react-pdf-viewer/locales/lib/fr_FR.json';
import it_IT from '@react-pdf-viewer/locales/lib/it_IT.json';
import jp_JP from '@react-pdf-viewer/locales/lib/jp_JP.json';
import ko_KR from '@react-pdf-viewer/locales/lib/ko_KR.json';
import pt_PT from '@react-pdf-viewer/locales/lib/pt_PT.json';
import ru_RU from '@react-pdf-viewer/locales/lib/ru_RU.json';
import zh_CN from '@react-pdf-viewer/locales/lib/zh_CN.json';
import zh_TW from '@react-pdf-viewer/locales/lib/zh_TW.json';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PdfViewer({ pdfFile }) {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const localeSwitcherPluginInstance = localeSwitcherPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();


  const { LocalePopover } = localeSwitcherPluginInstance;
  const { Toolbar } = toolbarPluginInstance;

  const [locale, setLocale] = useState('en_US');
  const [l10n, setL10n] = useState();
  const localizationContext = { l10n, setL10n };

  const localizations = {
    en_US: en_US,
    vi_VN: vi_VN,
    de_DE,
    ar_AE,
    es_ES,
    fr_Fr,
    it_IT,
    jp_JP,
    ko_KR,
    pt_PT,
    ru_RU,
    zh_CN,
    zh_TW
  };

  const switchToLocalization = (loc) => {
    setL10n(localizations[loc]);
    setLocale(loc);
  };


  return (
    <>
      {pdfFile &&
        <LocalizationContext.Provider value={localizationContext}>
          <div
            className="rpv-core__viewer"
            style={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              height: '500px',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                backgroundColor: '#eeeeee',
                borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
                display: 'flex',
                padding: '4px',
              }}
            >
              <Toolbar>
                {(props) => {
                  const {
                    CurrentPageInput,
                    Download,
                    EnterFullScreen,
                    GoToNextPage,
                    GoToPreviousPage,
                    NumberOfPages,
                    Open,
                    Print,
                    ShowProperties,
                    ShowSearchPopover,
                    Zoom,
                    ZoomIn,
                    ZoomOut,
                  } = props;
                  return (
                    <>
                      <>
                        <div style={{ padding: '0px 2px' }}>
                          <ShowSearchPopover />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          <GoToPreviousPage />
                        </div>
                        <div
                          style={{
                            padding: '0px 2px',
                            width: '4rem',
                          }}
                        >
                          <CurrentPageInput />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          / <NumberOfPages />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          <GoToNextPage />
                        </div>
                        <div
                          style={{
                            padding: '0px 2px',
                            marginLeft: 'auto',
                          }}
                        >
                          <ZoomOut />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          <Zoom />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          <ZoomIn />
                        </div>
                        <div
                          style={{
                            padding: '0px 2px',
                            marginLeft: 'auto',
                          }}
                        >
                          <EnterFullScreen />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          <Open />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          <Download />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          <Print />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          <ShowProperties />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                          <LocalePopover
                            initialLocale={locale}
                            locales={{
                              en_US: 'English',
                              vi_VN: 'Tiếng Việt',
                              de_DE: 'Deutschland',
                              ar_AE: 'عربي',
                              es_ES: 'Español',
                              fr_Fr: 'français',
                              it_IT: 'Italiano',
                              jp_JP: '日本',
                              ko_KR: '한국인',
                              pt_PT: 'Português',
                              ru_RU: 'русский',
                              zh_CN: '中国人',
                              zh_TW: '中國人'
                            }}
                            localizations={localizations}
                            onUpdateLocalization={switchToLocalization}
                          />
                        </div>
                      </>
                    </>
                  );
                }}
              </Toolbar>
            </div>
            <div
              style={{
                flex: 1,
                overflow: 'hidden',
              }}
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfFile}
                  plugins={[localeSwitcherPluginInstance, toolbarPluginInstance]}>
                </Viewer>;
              </Worker>
            </div>
          </div>
        </LocalizationContext.Provider>
        // <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
        //   <Viewer fileUrl={pdfFile}
        //     plugins={[localeSwitcherPluginInstance, defaultLayoutPluginInstance]}>
        //   </Viewer>;
        // </Worker>
      }
    </>
  )
}

export default PdfViewer
