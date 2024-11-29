import ElementWallAdd from '../../ui/components/ElementWallAdd/ElementWallAdd';

export default function ElementsProducts({
  elementsData,
  toggleElementVisibility,
  visibleElements,
  setElementsData,
  onSaveDataElement,
  setElementsWallModalVisible,
}: any) {
  return (
    <>
      {elementsData?.map((element: any, index: any) => {
        return (
          <ElementWallAdd
            key={index}
            element={element}
            position={index}
            nameElement={element.dataObj.nameElement}
            stateElement={element.dataObj.stateElement}
            onPressVisible={() => toggleElementVisibility(index, true)}
            isVisible={visibleElements}
            setVisible={toggleElementVisibility}
            elementsData={elementsData}
            setElementsData={setElementsData}
            onSaveElementSize={onSaveDataElement}
            setModalVisibleWall={setElementsWallModalVisible}
          />
        );
      })}
    </>
  );
}
