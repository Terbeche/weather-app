import { defineComponent } from 'vue';
import ForecastSidebar from './ForecastSidebar.vue';
import weatherIconMixin from './weatherIconMixin';
import { DashboardLocationDTO, LocationDTO } from '@/DTOs/Location';

export default defineComponent({
  components: {
    ForecastSidebar,
  },
  mixins: [weatherIconMixin],
  data() {
    return {
      locations: [] as DashboardLocationDTO[],
      allLocations: [] as LocationDTO[],
      filteredLocations: [] as LocationDTO[],
      columns: [{
        key: 'name',
        label: 'Location',
        class: 'bg-custom-gray text-white'
      }, {
        key: 'temperature',
        label: 'Temperature',
        class: 'bg-custom-gray text-white'
      }, {
        key: 'rainfall',
        label: 'Rainfall',
        class: 'bg-custom-gray text-white'
      }, {
        key: 'actions',
        class: 'bg-custom-gray text-white'
      }],
      selected: ref([]),
      showAddLocationModal: false,
      showDeleteModal: false,
      selectedLocationToAdd: null as LocationDTO | null,
      selectedLocationToRemove: null as DashboardLocationDTO | null,
      selectedLocationDetails: null as DashboardLocationDTO | null,
      selectedLocationId: null,
      showSidebar: false,
      searchQuery: ''
    }
  },
  watch: {
    showAddLocationModal(newVal) {
      if (!newVal) {
        this.searchQuery = '';
      }
    },
  },
  methods: {
    filterLocations() {
      this.filteredLocations = this.allLocations.filter((location: LocationDTO) => {
          const locationName = location.name;
          return locationName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    openAddLocationForm() {
      this.showAddLocationModal = true;
    },
    async addLocation() {
        const toast = useToast();

        if (!this.selectedLocationToAdd) return;
        const locationExists = this.locations.some((location: DashboardLocationDTO) => location.location_id === this.selectedLocationToAdd?.id);
        if (locationExists) {
          toast.add({ title: 'This location already exists!', color: 'red', timeout: 1500});
          return;
        }    
        try {
            const response = await fetch(`http://localhost:8000/dashboard_locations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: this.selectedLocationToAdd.id }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const dashboardLocation = await response.json();

            const locationResponse = await fetch(`http://localhost:8000/dashboard_locations/${dashboardLocation.id}`);
            const location: DashboardLocationDTO = await locationResponse.json();

            this.locations.push(location);
            this.showAddLocationModal = false;
            this.selectedLocationToAdd = null;
          } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    },
    async removeLocation(locationToRemove: DashboardLocationDTO) {
      try {
        const response = await fetch(`http://localhost:8000/dashboard_locations/${locationToRemove.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.locations = this.locations.filter((location: DashboardLocationDTO) => location.id !== locationToRemove.id);
        this.showDeleteModal = false;
        this.selectedLocationToRemove = null;
      } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
      }
    },            
    selectLocation(location: DashboardLocationDTO) {
      this.selectedLocationToRemove = location;
      this.showDeleteModal = true;
    },
    selectLocationToAdd(location: LocationDTO) {
      this.selectedLocationToAdd = location;
      this.searchQuery = location.name;
      this.filteredLocations = []
    },
    async selectLocationDetails(location: DashboardLocationDTO) {
      this.selectedLocationDetails = location;
      this.showSidebar = true;
      const response = await fetch(`http://localhost:8000/forecast/${location.location_id}`);
      const forecast = await response.json();
      this.selectedLocationDetails = { ...location, ...forecast };
    },
  }, 
  async created() {
    try {
      const response = await fetch('http://localhost:8000/all_locations');
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.allLocations = await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }

    try {
        const response = await fetch('http://localhost:8000/dashboard_locations');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const locations = await response.json();
        this.locations = locations.map((location: LocationDTO) => ({
            ...location,
            class: 'bg-custom-dashboard text-white'
        }));
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
  }
});
