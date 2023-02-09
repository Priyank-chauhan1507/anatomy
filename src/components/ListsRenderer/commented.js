/* <ReactSortable
                      list={orderOfList}
                      setList={setOrderOfList}
                      animation={200}
                      onEnd={() => {}}
                      handle=".sorting-handle"
                    >
                      {orderOfList.map(({ typeOfList, indexOfItem }) => {
                        switch (typeOfList) {
                          case "ordered":
                            return (
                              <div
                                key={"orderedlist"}
                                className={`${accordionClasses.root} app__mainBody__list__accordion__list app__mainBody__list__accordion__ordered`}
                              >
                                <Accordion defaultExpanded>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="app__mainBody__list__header"
                                    style={{ backgroundColor: "#0c27c8" }}
                                  >
                                    <Colors
                                      color={orderedListColor}
                                      onColorChange={(newColor) => {
                                        setOrderedListColor(newColor);
                                      }}
                                    />
                                    <Typography
                                      className={"accordion-heading"}
                                      style={{ flexGrow: 1 }}
                                    >
                                      {
                                        uiData.listTitle_OrderedProcedure
                                          .tr_text
                                      }{" "}
                                      ({orderedListContents.length})
                                    </Typography>
                                    <Button
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        color: "white",
                                        border: "solid 1px #fff",
                                      }}
                                    >
                                      {" "}
                                      {"<$>"}{" "}
                                    </Button>
                                    <Button
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        backgroundColor: "white",
                                      }}
                                    >
                                      <PrintIcon color="primary" />
                                    </Button>
                                    <IconButton
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        minWidth: "30px",
                                        maxWidth: "30px",
                                        marginRight: 0,
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowOrderedPinsOnSvg(
                                          (prev) => !prev
                                        );
                                      }}
                                    >
                                      {showOrderedPinsOnSvg ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                    <IconButton
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        minWidth: "35px",
                                        maxWidth: "35px",
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOrderListLocked((prev) => !prev);
                                      }}
                                    >
                                      {orderedListLocked
                                        ? uiData?.label_ListHeader_Lock
                                            ?.emoji_code
                                        : uiData?.label_ListHeader_Unlock
                                            ?.emoji_code}
                                    </IconButton>
                                    <Reorder
                                      style={{
                                        cursor: "move",
                                        color: "#707070",
                                        position: "absolute",
                                        top: "50%",
                                        right: "40px",
                                        transform: "translateY(-50%)",
                                      }}
                                      className="sorting-handle"
                                    />
                                  </AccordionSummary>
                                  <AccordionDetails className="app__mainBody__list__body">
                                    <Typography style={{ width: "100%" }}>
                                      <SubToolbar
                                        listType="ordered"
                                        locked={orderedListLocked}
                                        selectedPinShape={orderedListPinShape}
                                        plotOnSea={plotOnSeaOL}
                                        setplotOnSea={setplotOnSeaOL}
                                        setPinShape={setOLPinShape}
                                        setNextPinShape={setPinShape}
                                        listColor={orderedListColor}
                                        handleListOrdering={handleListOrdering}
                                        listItems={orderedListContents}
                                        setChronology={setOLChronology}
                                        selectedChronology={
                                          orderedListChronology
                                        }
                                        documentationOpen={documentationOLOpen}
                                        setDocumentationOpen={setOLDocOpen}
                                        setListItems={setOrderedListContents}
                                        setSelectedSubToolbar={
                                          setSelectedSubToolbar
                                        }
                                      />
                                      <GroupDocumentation
                                        groupName={"Ordered Procedure"}
                                        isOpen={documentationOLOpen}
                                      />
                                      <ReactSortable
                                        list={orderedListContents}
                                        setList={setOrderedListContents}
                                        animation={200}
                                        onEnd={() => {
                                          setOrderedListContents(
                                            sortList(orderedListContents)
                                          );
                                          setAllSNS({ ...allSNS });
                                        }}
                                        handle=".item-handle-icon"
                                        filter=".NoSort"
                                      >
                                        {orderedListContents.map(
                                          (listContent) => (
                                            <ListContent
                                              siteDetails={
                                                anatomicData[
                                                  listContent.attrInfo.amid
                                                ]
                                              }
                                              pinOnSea={listContent.pin_on_sea}
                                              id={listContent.id}
                                              content_id={
                                                listContent.content_id
                                              }
                                              locked={orderedListLocked}
                                              plotOnSea={plotOnSeaOL}
                                              pinShape={orderedListPinShape}
                                              nameIncludes={nameIncludes}
                                              delimiter={delimiter}
                                              color={orderedListColor}
                                              selectedChronology={
                                                orderedListChronology
                                              }
                                              formData={{
                                                ...patientInfo,
                                                ...encounterInfo,
                                                ...userSettings,
                                                ...listContent,
                                              }}
                                              biopsy__type={
                                                listContent.biopsy__type
                                              }
                                              pin_description={
                                                listContent.pin_description
                                              }
                                              setPinDescription={(
                                                pinDescription
                                              ) => {
                                                let newOrderedListContents = [
                                                  ...orderedListContents,
                                                ];

                                                newOrderedListContents.splice(
                                                  newOrderedListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    pin_description:
                                                      pinDescription,
                                                  }
                                                );

                                                setOrderedListContents(
                                                  newOrderedListContents
                                                );
                                              }}
                                              anatomic__site={
                                                listContent.anatomic__site
                                              }
                                              list__type={
                                                listContent.list__type
                                              }
                                              hierarchy={listContent.hierarchy}
                                              user__notes={
                                                listContent.user__notes
                                              }
                                              user__image={
                                                listContent.user__image
                                              }
                                              ar={
                                                arNames[
                                                  listContent.droppedPin__id
                                                ]
                                              }
                                              setAnatomicSite={(
                                                newAnatomicSite
                                              ) => {
                                                let newOrderedListContents = [
                                                  ...orderedListContents,
                                                ];

                                                newOrderedListContents.splice(
                                                  newOrderedListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    anatomic__site:
                                                      newAnatomicSite,
                                                  }
                                                );

                                                setOrderedListContents(
                                                  newOrderedListContents
                                                );
                                              }}
                                              setBiopsy__type={(biopsy) => {
                                                let newOrderedListContents = [
                                                  ...orderedListContents,
                                                ];

                                                newOrderedListContents.splice(
                                                  newOrderedListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    biopsy__type: biopsy,
                                                    pin_description:
                                                      getDefaultPinDescription(
                                                        biopsy
                                                      ),
                                                  }
                                                );

                                                setOrderedListContents(
                                                  newOrderedListContents
                                                );
                                              }}
                                              listContent={listContent}
                                              pinDetails={selectedListItem}
                                              delete__content={(id) => {
                                                let newOrderedListContents = [
                                                  ...orderedListContents,
                                                ];

                                                let deletedItem = {};

                                                newOrderedListContents =
                                                  sortList(
                                                    newOrderedListContents.filter(
                                                      (content) => {
                                                        if (content.id === id) {
                                                          deletedItem = content;
                                                        }
                                                        return (
                                                          content.id !== id
                                                        );
                                                      }
                                                    )
                                                  );

                                                addToThrashBin(
                                                  deletedItem,
                                                  "ordered"
                                                );
                                                if (
                                                  newOrderedListContents.length ===
                                                  0
                                                ) {
                                                  deleteOrderOfList("ordered");
                                                }
                                                setOrderedListContents(
                                                  newOrderedListContents
                                                );
                                              }}
                                              setUser__image={(image) => {
                                                let newOrderedListContents = [
                                                  ...orderedListContents,
                                                ];
                                                newOrderedListContents.splice(
                                                  newOrderedListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    user__image: image,
                                                  }
                                                );

                                                setOrderedListContents(
                                                  newOrderedListContents
                                                );
                                              }}
                                              setUser__notes={(notes) => {
                                                let newOrderedListContents = [
                                                  ...orderedListContents,
                                                ];

                                                newOrderedListContents.splice(
                                                  newOrderedListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    user__notes: notes,
                                                  }
                                                );

                                                setOrderedListContents(
                                                  newOrderedListContents
                                                );
                                              }}
                                              transfer_to_parent={(
                                                parentId
                                              ) => {
                                                transferPoints(
                                                  parentId,
                                                  listContent.droppedPin__id,
                                                  "ordered"
                                                );
                                              }}
                                              droppedPinId={
                                                listContent.droppedPin__id
                                              }
                                              onLocatePin={onLocatePin}
                                              attrInfo={listContent.attrInfo}
                                              sns={
                                                allSNS[
                                                  listContent.droppedPin__id
                                                ] ||
                                                (languageChangedRecently.current
                                                  ? getSNSConf
                                                  : globalSNS)
                                              }
                                              snsSequence={snsSequence}
                                              native_name={
                                                listContent.native_name
                                              }
                                              defined_name={
                                                listContent.defined_name
                                              }
                                              onOpenNameBuilder={() => {
                                                setSelectedListItem(
                                                  listContent
                                                );
                                                dispatchNBActions({
                                                  type: "open",
                                                  uiData,
                                                  lateralityData,
                                                  names: {
                                                    ...listContent.defined_name,
                                                    auto_related_name:
                                                      arNames[
                                                        listContent
                                                          .droppedPin__id
                                                      ] ?? [],
                                                  },
                                                  listContentInfo: {
                                                    listType: "ordered",
                                                    index: null,
                                                    droppedPin__id:
                                                      listContent.droppedPin__id,
                                                    id: listContent.id,
                                                    listSubType: null,
                                                    amid: listContent.attrInfo
                                                      .amid,
                                                    color: orderedListColor,
                                                    chronology:
                                                      orderedListChronology,
                                                    pinShape:
                                                      orderedListPinShape,
                                                    hierarchy:
                                                      listContent.hierarchy,
                                                    pinOnSea:
                                                      listContent.pin_on_sea,
                                                    transfer_to_parent: (
                                                      parentId
                                                    ) => {
                                                      transferPoints(
                                                        parentId,
                                                        listContent.droppedPin__id,
                                                        "ordered"
                                                      );
                                                    },
                                                  },
                                                  defaults: {
                                                    laterality:
                                                      listContent.native_name
                                                        .laterality,
                                                  },
                                                  sns: patchSNSObject(
                                                    allSNS[
                                                      listContent.droppedPin__id
                                                    ] ||
                                                      (languageChangedRecently.current
                                                        ? getSNSConf
                                                        : globalSNS),
                                                    listContent.attrInfo.amid,
                                                    uiData,
                                                    lateralityData
                                                  ),
                                                });
                                              }}
                                              editPinDescription={
                                                setEditPinDescriptionItem
                                              }
                                              editExternalLinks={
                                                editExternalLinks
                                              }
                                              setEditExternalLinksListContent={
                                                setEditExternalLinksListContent
                                              }
                                              patientJsx={patientInfoJSX}
                                              patientInfo={patientInfo}
                                              listContentInfo={
                                                selectedPinDescriptionEdit.listContent
                                              }
                                              patientImg={patientImg}
                                              snsLinkDescription={
                                                allSNS[
                                                  selectedPinDescriptionEdit
                                                    ?.listContent
                                                    ?.droppedPin__id
                                                ] || globalSNS
                                              }
                                            />
                                          )
                                        )}
                                      </ReactSortable>
                                    </Typography>
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                            );
                          case "comments":
                            return (
                              <div
                                key={"commentslist"}
                                className={`${accordionClasses.root} app__mainBody__list__accordion__list app__mainBody__list__accordion__comments`}
                              >
                                <Accordion defaultExpanded>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="app__mainBody__list__header"
                                    style={{ backgroundColor: "#0c27c8" }}
                                  >
                                    <Colors
                                      color={commentListColor}
                                      onColorChange={(newColor) => {
                                        setCommentListColor(newColor);
                                      }}
                                    />

                                    <Typography
                                      className={"accordion-heading"}
                                      style={{ flexGrow: 1 }}
                                    >
                                      {uiData.listTitle_Comment.tr_text} (
                                      {commentListContents.length})
                                    </Typography>
                                    <Button
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        color: "white",
                                        border: "solid 1px #fff",
                                      }}
                                    >
                                      {" "}
                                      {"<$>"}{" "}
                                    </Button>
                                    <Button
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        backgroundColor: "white",
                                      }}
                                    >
                                      <PrintIcon color="primary" />
                                    </Button>
                                    <IconButton
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        minWidth: "30px",
                                        maxWidth: "30px",
                                        marginRight: 0,
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowCommentPinsOnSvg(
                                          (prev) => !prev
                                        );
                                      }}
                                    >
                                      {showCommentPinsOnSvg ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                    <IconButton
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        minWidth: "35px",
                                        maxWidth: "35px",
                                        marginRight: "15px",
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCommentListLocked((prev) => !prev);
                                      }}
                                    >
                                      {commentListLocked
                                        ? uiData?.label_ListHeader_Lock
                                            ?.emoji_code
                                        : uiData?.label_ListHeader_Unlock
                                            ?.emoji_code}
                                    </IconButton>
                                    <Reorder
                                      style={{
                                        cursor: "move",
                                        color: "#707070",
                                        position: "absolute",
                                        top: "50%",
                                        right: "40px",
                                        transform: "translateY(-50%)",
                                      }}
                                      className="sorting-handle"
                                    />
                                  </AccordionSummary>
                                  <AccordionDetails className="app__mainBody__list__body">
                                    <Typography
                                      component={"div"}
                                      style={{ width: "100%" }}
                                    >
                                      <SubToolbar
                                        listType="comment"
                                        locked={commentListLocked}
                                        plotOnSea={plotOnSeaCL}
                                        setplotOnSea={setplotOnSeaCL}
                                        selectedPinShape={commentListPinShape}
                                        setPinShape={setCLPinShape}
                                        setNextPinShape={setPinShape}
                                        listColor={commentListColor}
                                        handleListOrdering={handleListOrdering}
                                        listItems={commentListContents}
                                        setChronology={setCLChronology}
                                        selectedChronology={
                                          commentListChronology
                                        }
                                        setListItems={setCommentListContents}
                                        documentationOpen={documentationCLOpen}
                                        setDocumentationOpen={setCLDocOpen}
                                        setSelectedSubToolbar={
                                          setSelectedSubToolbar
                                        }
                                      />
                                      <GroupDocumentation
                                        groupName={"Comments"}
                                        isOpen={documentationCLOpen}
                                      />
                                      <ReactSortable
                                        list={commentListContents}
                                        setList={setCommentListContents}
                                        animation={200}
                                        onEnd={() => {
                                          setCommentListContents(
                                            sortList(commentListContents)
                                          );
                                        }}
                                        handle=".item-handle-icon"
                                        filter=".NoSort"
                                      >
                                        {commentListContents.map(
                                          (listContent) => (
                                            <ListContent
                                              siteDetails={
                                                anatomicData[
                                                  listContent.attrInfo.amid
                                                ]
                                              }
                                              locked={commentListLocked}
                                              pinOnSea={listContent.pin_on_sea}
                                              color={commentListColor}
                                              pinShape={commentListPinShape}
                                              nameIncludes={nameIncludes}
                                              delimiter={delimiter}
                                              plotOnSea={plotOnSeaCL}
                                              selectedChronology={
                                                commentListChronology
                                              }
                                              formData={{
                                                ...patientInfo,
                                                ...encounterInfo,
                                                ...userSettings,
                                                ...listContent,
                                              }}
                                              id={listContent.id}
                                              content_id={
                                                listContent.content_id
                                              }
                                              biopsy__type={
                                                listContent.biopsy__type
                                              }
                                              pin_description={
                                                listContent.pin_description
                                              }
                                              setPinDescription={(
                                                pinDescription
                                              ) => {
                                                let newCommentListContents = [
                                                  ...commentListContents,
                                                ];

                                                newCommentListContents.splice(
                                                  newCommentListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    pin_description:
                                                      pinDescription,
                                                  }
                                                );

                                                setCommentListContents(
                                                  newCommentListContents
                                                );
                                              }}
                                              anatomic__site={
                                                listContent.anatomic__site
                                              }
                                              list__type={
                                                listContent.list__type
                                              }
                                              hierarchy={listContent.hierarchy}
                                              ar={
                                                arNames[
                                                  listContent.droppedPin__id
                                                ]
                                              }
                                              user__notes={
                                                listContent.user__notes
                                              }
                                              user__image={
                                                listContent.user__image
                                              }
                                              user__comment={
                                                listContent.user__comment
                                              }
                                              setAnatomicSite={(
                                                newAnatomicSite
                                              ) => {
                                                let newCommentListContents = [
                                                  ...commentListContents,
                                                ];

                                                newCommentListContents.splice(
                                                  newCommentListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    anatomic__site:
                                                      newAnatomicSite,
                                                  }
                                                );

                                                setCommentListContents(
                                                  newCommentListContents
                                                );
                                              }}
                                              setBiopsy__type={(biopsy) => {
                                                let newCommentListContents = [
                                                  ...commentListContents,
                                                ];

                                                newCommentListContents.splice(
                                                  newCommentListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    biopsy__type: biopsy,
                                                    pin_description:
                                                      getDefaultPinDescription(
                                                        biopsy
                                                      ),
                                                  }
                                                );

                                                setCommentListContents(
                                                  newCommentListContents
                                                );
                                              }}
                                              delete__content={(id) => {
                                                let newCommentListContents = [
                                                  ...commentListContents,
                                                ];
                                                let deletedItem = {};
                                                newCommentListContents =
                                                  sortList(
                                                    newCommentListContents.filter(
                                                      (content) => {
                                                        if (content.id === id) {
                                                          deletedItem = content;
                                                        }
                                                        return (
                                                          content.id !== id
                                                        );
                                                      }
                                                    )
                                                  );
                                                addToThrashBin(
                                                  deletedItem,
                                                  "comments"
                                                );
                                                if (
                                                  newCommentListContents.length ===
                                                  0
                                                ) {
                                                  deleteOrderOfList("comments");
                                                }
                                                setCommentListContents(
                                                  newCommentListContents
                                                );
                                              }}
                                              setUser__image={(image) => {
                                                let newCommentListContents = [
                                                  ...commentListContents,
                                                ];
                                                newCommentListContents.splice(
                                                  newCommentListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    user__image: image,
                                                  }
                                                );

                                                setCommentListContents(
                                                  newCommentListContents
                                                );
                                              }}
                                              setUser__notes={(notes) => {
                                                let newCommentListContents = [
                                                  ...commentListContents,
                                                ];

                                                newCommentListContents.splice(
                                                  newCommentListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    user__notes: notes,
                                                  }
                                                );

                                                setCommentListContents(
                                                  newCommentListContents
                                                );
                                              }}
                                              setUser__comments={(comments) => {
                                                let newCommentListContents = [
                                                  ...commentListContents,
                                                ];

                                                newCommentListContents.splice(
                                                  newCommentListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    user__comment: comments,
                                                  }
                                                );

                                                setCommentListContents(
                                                  newCommentListContents
                                                );
                                              }}
                                              transfer_to_parent={(
                                                parentId
                                              ) => {
                                                transferPoints(
                                                  parentId,
                                                  listContent.droppedPin__id,
                                                  "comments"
                                                );
                                              }}
                                              coords={
                                                listContent.normalized_coords
                                              }
                                              droppedPinId={
                                                listContent.droppedPin__id
                                              }
                                              onLocatePin={onLocatePin}
                                              attrInfo={listContent.attrInfo}
                                              native_name={
                                                listContent.native_name
                                              }
                                              defined_name={
                                                listContent.defined_name
                                              }
                                              sns={
                                                allSNS[
                                                  listContent.droppedPin__id
                                                ] ||
                                                (languageChangedRecently.current
                                                  ? getSNSConf
                                                  : globalSNS)
                                              }
                                              snsSequence={snsSequence}
                                              onOpenNameBuilder={() => {
                                                setSelectedListItem(
                                                  listContent
                                                );
                                                dispatchNBActions({
                                                  type: "open",
                                                  uiData,
                                                  lateralityData,
                                                  names: {
                                                    ...listContent.defined_name,
                                                    auto_related_name:
                                                      arNames[
                                                        listContent
                                                          .droppedPin__id
                                                      ] ?? [],
                                                  },
                                                  listContentInfo: {
                                                    listType: "comments",
                                                    droppedPin__id:
                                                      listContent.droppedPin__id,

                                                    index: null,
                                                    id: listContent.id,
                                                    listSubType: null,
                                                    amid: listContent.attrInfo
                                                      .amid,
                                                    color: commentListColor,
                                                    chronology:
                                                      commentListChronology,
                                                    pinShape:
                                                      commentListPinShape,
                                                    hierarchy:
                                                      listContent.hierarchy,
                                                    pinOnSea:
                                                      listContent.pin_on_sea,
                                                    transfer_to_parent: (
                                                      parentId
                                                    ) => {
                                                      transferPoints(
                                                        parentId,
                                                        listContent.droppedPin__id,
                                                        "comments"
                                                      );
                                                    },
                                                  },
                                                  defaults: {
                                                    laterality:
                                                      listContent.native_name
                                                        .laterality,
                                                  },
                                                  sns: patchSNSObject(
                                                    allSNS[
                                                      listContent.droppedPin__id
                                                    ] ||
                                                      (languageChangedRecently.current
                                                        ? getSNSConf
                                                        : globalSNS),
                                                    listContent.attrInfo.amid,
                                                    uiData,
                                                    lateralityData
                                                  ),
                                                });
                                              }}
                                              editPinDescription={
                                                setEditPinDescriptionItem
                                              }
                                            />
                                          )
                                        )}
                                      </ReactSortable>
                                    </Typography>
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                            );
                          case "diagnosis":
                            return (
                              <div
                                key="diagnosis"
                                className={`${accordionClasses.root} app__mainBody__list__accordion__list app__mainBody__list__accordion__comments`}
                              >
                                <Accordion defaultExpanded>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="app__mainBody__list__header"
                                    style={{ backgroundColor: "#0c27c8" }}
                                  >
                                    <Colors
                                      color={diagnosisListColor}
                                      onColorChange={(newColor) => {
                                        setDiagnosisListColor(newColor);
                                      }}
                                    />

                                    <Typography
                                      className={"accordion-heading"}
                                      style={{ flexGrow: 1 }}
                                    >
                                      Diagnosis List (
                                      {diagnosisListContents.length})
                                    </Typography>
                                    <Button
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        color: "white",
                                        border: "solid 1px #fff",
                                      }}
                                    >
                                      {" "}
                                      {"<$>"}{" "}
                                    </Button>
                                    <Button
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        backgroundColor: "white",
                                      }}
                                    >
                                      <PrintIcon color="primary" />
                                    </Button>
                                    <IconButton
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        minWidth: "30px",
                                        maxWidth: "30px",
                                        marginRight: 0,
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDiagnosisListPinsOnSvg(
                                          (prev) => !prev
                                        );
                                      }}
                                    >
                                      {showDiagnosisListPinsOnSvg ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                    <IconButton
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        minWidth: "35px",
                                        maxWidth: "35px",
                                        marginRight: "15px",
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDiagnosisListLocked((prev) => !prev);
                                      }}
                                    >
                                      {diagnosisListLocked
                                        ? uiData?.label_ListHeader_Lock
                                            ?.emoji_code
                                        : uiData?.label_ListHeader_Unlock
                                            ?.emoji_code}
                                    </IconButton>
                                    <Reorder
                                      style={{
                                        cursor: "move",
                                        color: "#707070",
                                        position: "absolute",
                                        top: "50%",
                                        right: "40px",
                                        transform: "translateY(-50%)",
                                      }}
                                      className="sorting-handle"
                                    />
                                  </AccordionSummary>
                                  <AccordionDetails className="app__mainBody__list__body">
                                    <Typography
                                      component={"div"}
                                      style={{ width: "100%" }}
                                    >
                                      <SubToolbar
                                        listType="diagnosis"
                                        locked={diagnosisListLocked}
                                        selectedPinShape={diagnosisListPinShape}
                                        plotOnSea={plotOnSeaDL}
                                        setplotOnSea={setplotOnSeaDL}
                                        setPinShape={setDLPinShape}
                                        setNextPinShape={setPinShape}
                                        listColor={diagnosisListColor}
                                        handleListOrdering={handleListOrdering}
                                        listItems={diagnosisListContents}
                                        setChronology={setDLChronology}
                                        selectedChronology={
                                          diagnosisListChronology
                                        }
                                        setListItems={setDiagnosisListContents}
                                        documentationOpen={documentationDLOpen}
                                        setDocumentationOpen={setDLDocOpen}
                                        setSelectedSubToolbar={
                                          setSelectedSubToolbar
                                        }
                                      />
                                      <GroupDocumentation
                                        groupName={"Single Diagnosis"}
                                        isOpen={documentationDLOpen}
                                      />
                                      <ReactSortable
                                        list={diagnosisListContents}
                                        setList={setDiagnosisListContents}
                                        animation={200}
                                        onEnd={() => {
                                          setDiagnosisListContents(
                                            sortList(diagnosisListContents)
                                          );
                                        }}
                                        handle=".item-handle-icon"
                                        filter=".NoSort"
                                      >
                                        {diagnosisListContents.map(
                                          (listContent) => (
                                            <ListContent
                                              siteDetails={
                                                anatomicData[
                                                  listContent.attrInfo.amid
                                                ]
                                              }
                                              pinOnSea={listContent.pin_on_sea}
                                              id={listContent.id}
                                              content_id={
                                                listContent.content_id
                                              }
                                              locked={diagnosisListLocked}
                                              plotOnSea={plotOnSeaDL}
                                              nameIncludes={nameIncludes}
                                              delimiter={delimiter}
                                              pinShape={diagnosisListPinShape}
                                              color={diagnosisListColor}
                                              selectedChronology={
                                                diagnosisListChronology
                                              }
                                              formData={{
                                                ...patientInfo,
                                                ...encounterInfo,
                                                ...userSettings,
                                                ...listContent,
                                              }}
                                              biopsy__type={
                                                listContent.biopsy__type
                                              }
                                              pin_description={
                                                listContent.pin_description
                                              }
                                              setPinDescription={(
                                                pinDescription
                                              ) => {
                                                let newDiagnosisListContents = [
                                                  ...diagnosisListContents,
                                                ];

                                                newDiagnosisListContents.splice(
                                                  newDiagnosisListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    pin_description:
                                                      pinDescription,
                                                  }
                                                );

                                                setDiagnosisListContents(
                                                  newDiagnosisListContents
                                                );
                                              }}
                                              ar={
                                                arNames[
                                                  listContent.droppedPin__id
                                                ]
                                              }
                                              anatomic__site={
                                                listContent.anatomic__site
                                              }
                                              list__type={
                                                listContent.list__type
                                              }
                                              hierarchy={listContent.hierarchy}
                                              user__notes={
                                                listContent.user__notes
                                              }
                                              user__image={
                                                listContent.user__image
                                              }
                                              user__comment={
                                                listContent.user__comment
                                              }
                                              setAnatomicSite={(
                                                newAnatomicSite
                                              ) => {
                                                let newDiagnosisListContents = [
                                                  ...diagnosisListContents,
                                                ];

                                                newDiagnosisListContents.splice(
                                                  newDiagnosisListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    anatomic__site:
                                                      newAnatomicSite,
                                                  }
                                                );

                                                setDiagnosisListContents(
                                                  newDiagnosisListContents
                                                );
                                              }}
                                              setBiopsy__type={(biopsy) => {
                                                let newDiagnosisListContents = [
                                                  ...diagnosisListContents,
                                                ];

                                                newDiagnosisListContents.splice(
                                                  newDiagnosisListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    biopsy__type: biopsy,
                                                    pin_description:
                                                      getDefaultPinDescription(
                                                        biopsy
                                                      ),
                                                  }
                                                );

                                                setDiagnosisListContents(
                                                  newDiagnosisListContents
                                                );
                                              }}
                                              delete__content={(id) => {
                                                let newDiagnosisListContents = [
                                                  ...diagnosisListContents,
                                                ];
                                                let deletedItem = {};
                                                newDiagnosisListContents =
                                                  sortList(
                                                    newDiagnosisListContents.filter(
                                                      (content) => {
                                                        if (content.id === id) {
                                                          deletedItem = content;
                                                        }
                                                        return (
                                                          content.id !== id
                                                        );
                                                      }
                                                    )
                                                  );
                                                addToThrashBin(
                                                  deletedItem,
                                                  "diagnosis"
                                                );
                                                if (
                                                  newDiagnosisListContents.length ===
                                                  0
                                                ) {
                                                  deleteOrderOfList(
                                                    "diagnosis"
                                                  );
                                                }
                                                setDiagnosisListContents(
                                                  newDiagnosisListContents
                                                );
                                              }}
                                              setUser__image={(image) => {
                                                let newDiagnosisListContents = [
                                                  ...diagnosisListContents,
                                                ];
                                                newDiagnosisListContents.splice(
                                                  newDiagnosisListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    user__image: image,
                                                  }
                                                );

                                                setDiagnosisListContents(
                                                  newDiagnosisListContents
                                                );
                                              }}
                                              setUser__notes={(notes) => {
                                                let newDiagnosisListContents = [
                                                  ...diagnosisListContents,
                                                ];

                                                newDiagnosisListContents.splice(
                                                  newDiagnosisListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    user__notes: notes,
                                                  }
                                                );

                                                setDiagnosisListContents(
                                                  newDiagnosisListContents
                                                );
                                              }}
                                              setUser__comments={(comments) => {
                                                let newDiagnosisListContents = [
                                                  ...diagnosisListContents,
                                                ];

                                                newDiagnosisListContents.splice(
                                                  newDiagnosisListContents.findIndex(
                                                    (content) =>
                                                      content.id ===
                                                      listContent.id
                                                  ),
                                                  1,
                                                  {
                                                    ...listContent,
                                                    user__comment: comments,
                                                  }
                                                );

                                                setDiagnosisListContents(
                                                  newDiagnosisListContents
                                                );
                                              }}
                                              transfer_to_parent={(
                                                parentId
                                              ) => {
                                                
                                                //   parentId,
                                                //   listContent.droppedPin__id
                                                // );
                                                transferPoints(
                                                  parentId,
                                                  listContent.droppedPin__id,
                                                  "diagnosis"
                                                );
                                              }}
                                              coords={listContent.coords}
                                              droppedPinId={
                                                listContent.droppedPin__id
                                              }
                                              onLocatePin={onLocatePin}
                                              attrInfo={listContent.attrInfo}
                                              native_name={
                                                listContent.native_name
                                              }
                                              defined_name={
                                                listContent.defined_name
                                              }
                                              onOpenNameBuilder={() => {
                                                setSelectedListItem(
                                                  listContent
                                                );
                                                dispatchNBActions({
                                                  type: "open",
                                                  uiData,
                                                  lateralityData,
                                                  names: {
                                                    ...listContent.defined_name,
                                                    auto_related_name:
                                                      arNames[
                                                        listContent
                                                          .droppedPin__id
                                                      ] ?? [],
                                                  },
                                                  listContentInfo: {
                                                    listType: "diagnosis",
                                                    droppedPin__id:
                                                      listContent.droppedPin__id,

                                                    index: null,
                                                    id: listContent.id,
                                                    listSubType: null,
                                                    amid: listContent.attrInfo
                                                      .amid,
                                                    color: diagnosisListColor,
                                                    chronology:
                                                      diagnosisListChronology,
                                                    pinShape:
                                                      diagnosisListPinShape,
                                                    hierarchy:
                                                      listContent.hierarchy,
                                                    pinOnSea:
                                                      listContent.pin_on_sea,
                                                    transfer_to_parent: (
                                                      parentId
                                                    ) => {
                                                      transferPoints(
                                                        parentId,
                                                        listContent.droppedPin__id,
                                                        "diagnosis"
                                                      );
                                                    },
                                                  },
                                                  defaults: {
                                                    laterality:
                                                      listContent.native_name
                                                        .laterality,
                                                  },
                                                  sns: patchSNSObject(
                                                    allSNS[
                                                      listContent.droppedPin__id
                                                    ] ||
                                                      (languageChangedRecently.current
                                                        ? getSNSConf
                                                        : globalSNS),
                                                    listContent.attrInfo.amid,
                                                    uiData,
                                                    lateralityData
                                                  ),
                                                });
                                              }}
                                              sns={
                                                allSNS[
                                                  listContent.droppedPin__id
                                                ] ||
                                                (languageChangedRecently.current
                                                  ? getSNSConf
                                                  : globalSNS)
                                              }
                                              snsSequence={snsSequence}
                                              editPinDescription={
                                                setEditPinDescriptionItem
                                              }
                                            />
                                          )
                                        )}
                                      </ReactSortable>
                                    </Typography>
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                            );
                          case "grouped":
                            const index = indexOfItem;
                            const g = groupedList[index];
                            const showPinsOnSvg =
                              groupedList[index].showPinsOnSvg;
                            const locked = groupedList[index].locked;
                            const listLabelAndVal =
                              getTotalForGroupedList(index);
                            return (
                              <div
                                key={"grouped" + index}
                                className={`${accordionClasses.root}   app__mainBody__list__accordion__list app__mainBody__list__accordion__unordered`}
                              >
                                <Accordion defaultExpanded>
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="app__mainBody__list__header"
                                    style={{
                                      backgroundColor: "#0c27c8",
                                      position: "relative",
                                    }}
                                  >
                                    <Colors
                                      color={g.color}
                                      onColorChange={(newColor) => {
                                        const newGrpList = [...groupedList];
                                        newGrpList[index].color = newColor;
                                        setGroupedList(newGrpList);
                                      }}
                                    />

                                    <Typography
                                      className={"accordion-heading"}
                                      style={{ flexGrow: 1 }}
                                    >
                                      {getTranslatedGroupName(g.name)} (
                                      {listLabelAndVal.label} :{" "}
                                      {listLabelAndVal.total})
                                    </Typography>
                                    <Button
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        color: "white",
                                        border: "solid 1px #fff",
                                      }}
                                    >
                                      {" "}
                                      {"<$>"}{" "}
                                    </Button>
                                    <Button
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        backgroundColor: "white",
                                      }}
                                    >
                                      <PrintIcon color="primary" />
                                    </Button>
                                    <IconButton
                                      className="app__mainBody__list__action__btns"
                                      Fsex
                                      style={{
                                        minWidth: "30px",
                                        maxWidth: "30px",
                                        marginRight: 0,
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        changeVisibilityOfGroupPinsOnSVG(
                                          index,
                                          !showPinsOnSvg
                                        );
                                        const newGList = [...groupedList];
                                        newGList[index] = {
                                          ...newGList[index],
                                          showPinsOnSvg: !showPinsOnSvg,
                                        };
                                        setGroupedList(newGList);
                                      }}
                                    >
                                      {showPinsOnSvg ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                    <IconButton
                                      className="app__mainBody__list__action__btns"
                                      style={{
                                        minWidth: "35px",
                                        maxWidth: "35px",
                                        marginRight: "15px",
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const newGList = [...groupedList];
                                        newGList[index] = {
                                          ...newGList[index],
                                          locked: !locked,
                                        };
                                        setGroupedList(newGList);
                                      }}
                                    >
                                      {locked
                                        ? uiData?.label_ListHeader_Lock
                                            ?.emoji_code
                                        : uiData?.label_ListHeader_Unlock
                                            ?.emoji_code}
                                    </IconButton>
                                    <Reorder
                                      style={{
                                        cursor: "move",
                                        color: "#707070",
                                        position: "absolute",
                                        top: "50%",
                                        right: "40px",
                                        transform: "translateY(-50%)",
                                      }}
                                      className="sorting-handle"
                                    />
                                  </AccordionSummary>

                                  <AdditionalDocumentation
                                    locked={locked}
                                    name={g.name}
                                    note={g.note}
                                    code={g.code}
                                    setNextPinShape={setPinShape}
                                    listItems={g.items}
                                    plotOnSea={g.plotOnSea}
                                    color={g.color}
                                    images={g.images}
                                    inputs={g.inputs}
                                    addDocs={g.addDocs}
                                    pinShape={g.pinShape}
                                    onNoteChange={(newNote) => {
                                      const newGList = [...groupedList];
                                      newGList[index] = {
                                        ...newGList[index],
                                        note: newNote,
                                      };
                                      setGroupedList(newGList);
                                    }}
                                    onImagesChange={(images) => {
                                      const newGList = [...groupedList];
                                      newGList[index] = {
                                        ...newGList[index],
                                        images: images,
                                      };
                                      setGroupedList(newGList);
                                    }}
                                    onInputChange={(newValue, ind) => {
                                      const newGList = [...groupedList];
                                      newGList[index] = {
                                        ...newGList[index],
                                        inputs: [...newGList[index].inputs],
                                      };
                                      newGList[index].inputs[ind] = {
                                        ...newGList[index].inputs[ind],
                                        value: newValue,
                                      };
                                      setGroupedList(newGList);
                                    }}
                                    onCodeChange={(newValue) => {
                                      const newGList = [...groupedList];
                                      newGList[index] = {
                                        ...newGList[index],
                                        code: {
                                          ...newGList[index].code,
                                          value: newValue,
                                        },
                                      };
                                      setGroupedList(newGList);
                                    }}
                                    setPinShape={(newPinShape) => {
                                      const newGrpList = [...groupedList];
                                      newGrpList[index].pinShape = newPinShape;
                                      setGroupedList(newGrpList);
                                      setPinShape(newPinShape);
                                    }}
                                    setplotOnSea={(newplotOnSea) => {
                                      const newGrpList = [...groupedList];
                                      newGrpList[index].plotOnSea =
                                        newplotOnSea;
                                      setGroupedList(newGrpList);
                                      setplotOnSea(newplotOnSea);
                                    }}
                                    setSelectedSubToolbar={
                                      setSelectedSubToolbar
                                    }
                                  />
                                  <GroupedItems
                                    locked={locked}
                                    allSNS={allSNS}
                                    listItems={g.items}
                                    pinShape={g.pinShape}
                                    color={g.color}
                                    name={g.name}
                                    nameIncludes={nameIncludes}
                                    delimiter={delimiter}
                                    formData={{
                                      ...patientInfo,
                                      ...encounterInfo,
                                      ...userSettings,
                                    }}
                                    getARName={(id) => arNames[id]}
                                    setPinDescription={(
                                      pinDescription,
                                      ind
                                    ) => {
                                      const newGroupedList =
                                        cloneDeep(groupedList);
                                      let [newItem] = newGroupedList[
                                        index
                                      ].items.splice(ind, 1);

                                      newGroupedList[index].items.splice(
                                        ind,
                                        1,
                                        {
                                          ...newItem,
                                          pin_description: pinDescription,
                                        }
                                      );

                                      setGroupedList(newGroupedList);
                                    }}
                                    setAnatomicSiteGroup={(
                                      newAnatomicSite,
                                      ind
                                    ) => {
                                      const newGroupedList =
                                        cloneDeep(groupedList);
                                      let [newItem] = newGroupedList[
                                        index
                                      ].items.splice(ind, 1);

                                      newGroupedList[index].items.splice(
                                        ind,
                                        1,
                                        {
                                          ...newItem,
                                          anatomic__site: newAnatomicSite,
                                        }
                                      );

                                      setGroupedList(newGroupedList);
                                    }}
                                    setBiopsy__type={(newType, ind) => {
                                      const newGroupedList =
                                        cloneDeep(groupedList);
                                      const [newItem] = newGroupedList[
                                        index
                                      ].items.splice(ind, 1);
                                      if (
                                        newGroupedList[index].items.length === 0
                                      ) {
                                        newGroupedList.splice(index, 1);
                                      }
                                      const i = newGroupedList.findIndex(
                                        (value) => value.name === newType
                                      );
                                      if (i === -1) {
                                        newGroupedList.push({
                                          ...groupAttributes[newType],
                                          id: newType,
                                          items: [
                                            {
                                              ...newItem,
                                              biopsy__type: newType,
                                              pin_description:
                                                getDefaultPinDescription(
                                                  newType
                                                ),
                                            },
                                          ],
                                        });
                                      } else {
                                        newGroupedList[i].items.push({
                                          ...newItem,
                                          biopsy__type: newType,
                                          pin_description:
                                            getDefaultPinDescription(newType),
                                        });
                                      }
                                      setGroupedList(newGroupedList);
                                    }}
                                    delete__content={(ind) => {
                                      const newGroupedList =
                                        cloneDeep(groupedList);
                                      const [item] = newGroupedList[
                                        index
                                      ].items.splice(ind, 1);

                                      addToThrashBin(
                                        item,
                                        "grouped",
                                        newGroupedList[index].name
                                      );
                                      if (
                                        newGroupedList[index].items.length === 0
                                      ) {
                                        // if(newOrderedListContents.length===0){
                                        
                                        //   "Deleting Order Of List",
                                        //   index,
                                        //   "grouped"
                                        // );
                                        deleteOrderOfList("grouped", index);
                                        // }
                                        newGroupedList.splice(index, 1);
                                      }
                                      setGroupedList(newGroupedList);
                                    }}
                                    setUser__image={(ind, images) => {
                                      const list = cloneDeep(groupedList);
                                      list[index].items[ind] = {
                                        ...list[index].items[ind],
                                        user__image: images,
                                      };
                                      setGroupedList(list);
                                    }}
                                    setListItems={(newList) => {
                                      const list = [...groupedList];
                                      list[index] = {
                                        ...list[index],
                                        items: newList,
                                      };
                                      setGroupedList(list);
                                    }}
                                    onInputChange={(
                                      newValue,
                                      itemIndex,
                                      ind
                                    ) => {
                                      const newGrpList = cloneDeep(groupedList);
                                      newGrpList[index].items[itemIndex].inputs[
                                        ind
                                      ]["value"] = newValue;
                                      setGroupedList(newGrpList);
                                    }}
                                    transfer_to_parent={(parentId, id) => {
                                      transferPoints(
                                        parentId,
                                        id,
                                        "grouped",
                                        index
                                      );
                                    }}
                                    onLocatePin={onLocatePin}
                                    onOpenNameBuilder={({
                                      names,
                                      sns,
                                      id,
                                      native_name,
                                      droppedPin__id,
                                      site_amid,
                                      hierarchy,
                                      pinOnSea,
                                    }) => {
                                      setSelectedListItem({
                                        attrInfo: { amid: site_amid },
                                      });
                                      dispatchNBActions({
                                        type: "open",
                                        uiData,
                                        lateralityData,
                                        names: {
                                          ...names,
                                          auto_related_name:
                                            arNames[droppedPin__id] ?? [],
                                        },
                                        listContentInfo: {
                                          listType: "grouped",
                                          droppedPin__id,
                                          index: null,
                                          id,
                                          listSubType: g.name,
                                          color: g.color,
                                          amid: site_amid,
                                          chronology: undefined,
                                          pinShape: g.pinShape,
                                          hierarchy,
                                          pinOnSea,
                                          transfer_to_parent: (
                                            parentId,
                                            id
                                          ) => {
                                            transferPoints(
                                              parentId,
                                              id,
                                              "grouped",
                                              index
                                            );
                                          },
                                        },
                                        defaults: {
                                          laterality: native_name.laterality,
                                        },
                                        sns: patchSNSObject(
                                          allSNS[droppedPin__id] ||
                                            (languageChangedRecently.current
                                              ? getSNSConf
                                              : globalSNS),
                                          site_amid,
                                          uiData,
                                          lateralityData
                                        ),
                                      });
                                    }}
                                    sns={globalSNS}
                                    editPinDescription={
                                      setEditPinDescriptionItem
                                    }
                                  />
                                </Accordion>
                              </div>
                            );
                          case "distribution":
                            return (
                              <div>
                                <DistributionPainterList
                                  name={indexOfItem}
                                  globalSNS={globalSNS}
                                  getSNS={getDistributionSNS}
                                  onOpenNameBuilder={(
                                    listContentInfo,
                                    names,
                                    sns
                                  ) => {
                                    dispatchNBActions({
                                      type: "open",
                                      listContentInfo,
                                      lateralityData,
                                      names: names,
                                      sns: sns,
                                    });
                                  }}
                                  nameIncludes={nameIncludes}
                                  delimiter={delimiter}
                                  onLocatePin={onLocatePin}
                                  snsSequence={snsSequence}
                                />
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                    </ReactSortable>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBlock: "1rem",
                        gap: "1rem",
                      }}
                    >
                      <Typography style={{ fontWeight: "bold" }}>
                        {uiData.label_PatentPending.tr_text}
                      </Typography>
                      <Tooltip
                        title={uiData?.label_PatentPending_help?.tr_text}
                        enterTouchDelay={30}
                      >
                        <Help />
                      </Tooltip>
                    </div>

                    {deleteList.length !== 0 && (
                      <div
                        className={`${accordionClasses.root} app__mainBody__list__accordion__list app__mainBody__list__accordion__comments`}
                      >
                        <Accordion defaultExpanded>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="app__mainBody__list__header"
                            style={{ backgroundColor: "#f44336" }}
                          >
                            <Typography className={"accordion-heading"}>
                              Unlisted items ({deleteList.length})
                            </Typography>
                            <Tooltip
                              title={
                                "These pins and their content may be restored to the list they originated from; moved to a different list; or deleted completely. Images and notes may be recycled to an exisiting list item. Any content in this area will not be exported."
                              }
                              enterTouchDelay={50}
                            >
                              <IconButton style={{ padding: "0px 12px" }}>
                                <Help />
                              </IconButton>
                            </Tooltip>
                          </AccordionSummary>
                          <AccordionDetails className="app__mainBody__list__body">
                            <DeleteListContent
                              onUndoItem={(index) => {
                                const { item, listType } = deleteList[index];
                                const newDeleteList = cloneDeep(deleteList);
                                newDeleteList.splice(index, 1);
                                setDeleteList(newDeleteList);
                                document.getElementById(item.droppedPin__id) &&
                                  (document.getElementById(
                                    item.droppedPin__id
                                  ).style.display = "inline");
                                updateList(item, listType, true);
                              }}
                              list={deleteList}
                              onDeleteItem={(index) => {
                                const newDeleteList = cloneDeep(deleteList);
                                const [item] = newDeleteList.splice(index, 1);
                                document.getElementById(item.droppedPin__id) &&
                                  document
                                    .getElementById(item.droppedPin__id)
                                    .remove();

                                setDeleteList(newDeleteList);
                              }}
                            />
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    )} */
