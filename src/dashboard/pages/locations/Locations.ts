import { defineComponent } from 'vue';
import ForecastSidebar from './ForecastSidebar.vue';
import weatherIconMixin from './weatherIconMixin';
import { DashboardLocationDTO, LocationDTO } from '@/DTOs/Location';

const config = useRuntimeConfig()

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
      showSidebar: false,
      searchQuery: '',
      isLoading: true,
      isAddingLocation: false,
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    showAddLocationModal(newVal) {
      if (!newVal) {
        this.searchQuery = '';
      }
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(`${config.public.baseWeb}/all_locations`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.allLocations = await response.json();
      } catch (error) {
          console.error('There was a problem with the fetch operation: ', error);
      }

      try {
          const response = await fetch(`${config.public.baseWeb}/dashboard_locations`);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const locations = await response.json();
          if (this.locations.length === 0) {
            this.isLoading = false;
          }
          this.locations = locations.map((location: LocationDTO) => ({
              ...location,
              class: 'bg-custom-gray-dashboard text-white'
          }));
      } catch (error) {
          console.error('There was a problem with the fetch operation: ', error);
      }
    },
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
        this.isAddingLocation = true; 
        const locationExists = this.locations.some((location: DashboardLocationDTO) => location.location_id === this.selectedLocationToAdd?.id);
        if (locationExists) {
          toast.add({ title: 'This location already exists!', color: 'red', timeout: 1500});
          this.isAddingLocation = false;
          return;
        }    
        try {
            const response = await fetch(`${config.public.baseWeb}/dashboard_locations`, {
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

            const locationResponse = await fetch(`${config.public.baseWeb}/dashboard_locations/${dashboardLocation.id}`);
            const location: DashboardLocationDTO = await locationResponse.json();

            this.locations.push(location);
            this.showAddLocationModal = false;
            this.selectedLocationToAdd = null;
          } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        } finally {
            this.isAddingLocation = false;
          }
    },
    async removeLocation(locationToRemove: DashboardLocationDTO) {
      try {
        const response = await fetch(`${config.public.baseWeb}/dashboard_locations/${locationToRemove.id}`, {
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
      const response = await fetch(`${config.public.baseWeb}/forecast/${location.location_id}`);
      const forecast = await response.json();
      this.selectedLocationDetails = { ...location, ...forecast };
    },
  }
});
