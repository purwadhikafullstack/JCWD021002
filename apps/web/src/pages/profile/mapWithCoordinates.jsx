/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';

const MapWithCoordinates = (props) => {
  const mapRef = useRef(null);
  const platform = useRef(null);
  const { apikey, userPosition, onMarkerDragEnd, onMarkerClick } = props;
  const map = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      platform.current = new H.service.Platform({ apikey });
      const rasterTileService = platform.current.getRasterTileService({
        queryParams: {
          style: 'explore.day',
          size: 512,
        },
      });

      const defaultLoc = { lat: '-6.186486', lng: '106.834091' };

      const rasterTileProvider = new H.service.rasterTile.Provider(
        rasterTileService,
      );
      const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);

      // Hanya buat peta baru jika belum ada
      if (!map.current) {
        map.current = new H.Map(mapRef.current, rasterTileLayer, {
          pixelRatio: window.devicePixelRatio,
          center: userPosition || defaultLoc,
          zoom: 16,
        });

        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(map.current),
        );

        if (userPosition) {
          const marker = new H.map.Marker(userPosition, { volatility: true, draggable: true });
          map.current.addObject(marker);
        }

        // Event listener untuk menangani klik pada peta
        map.current.addEventListener('tap', (event) => {
          const position = map.current.screenToGeo(
            event.currentPointer.viewportX,
            event.currentPointer.viewportY
          );
          onMarkerDragEnd({ lat: position.lat, lng: position.lng });
          onMarkerClick({ lat: position.lat, lng: position.lng });
        });
      }
    };

    initializeMap();
  }, [apikey, userPosition, onMarkerDragEnd, onMarkerClick]);

  // Memantau perubahan pada userPosition
  useEffect(() => {
    if (userPosition && map.current) {
      // Update pusat peta ke userPosition baru
      map.current.setCenter(userPosition);

      // Hapus marker lama
      map.current.removeObjects(map.current.getObjects());

      // Tambahkan marker baru yang dapat digeser
      const marker = new H.map.Marker(userPosition, { volatility: true, draggable: true });
      map.current.addObject(marker);

      // Event listener untuk menangani ketika marker digeser
      marker.addEventListener('dragend', (event) => {
        const newPosition = event.target.getGeometry();
        onMarkerDragEnd({ lat: newPosition.lat, lng: newPosition.lng });
      });

      // Event listener untuk menangani klik pada marker
      marker.addEventListener('tap', (event) => {
        const clickedPosition = map.current.screenToGeo(
          event.currentPointer.viewportX,
          event.currentPointer.viewportY
        );
        onMarkerClick({ lat: clickedPosition.lat, lng: clickedPosition.lng });
      });
    }
  }, [userPosition, onMarkerDragEnd, onMarkerClick]);

  return <div ref={mapRef} style={{ width: '100%', height: '350px' }} />;
};

export default MapWithCoordinates;
