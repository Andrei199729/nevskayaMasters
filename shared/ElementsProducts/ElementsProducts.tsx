import React from 'react';
import ElementWallAdd from '../../ui/components/ElementWallAdd/ElementWallAdd';
import {IElementsProductsProps, TDataObjElement} from '../types';

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
      {elementsData?.map(
        (element: {dataObj: TDataObjElement}, index: number) => {
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
        },
      )}
    </>
  );
}
