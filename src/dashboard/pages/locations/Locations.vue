<template>
    <div>
      <div class="m-12 my-0 pt-4 flex flex-col">
        <div class="flex flex-row mb-12 mt-0 gap-2 items-center">
          <img class="w-12" src="@/assets/icons/5.svg" alt="Vue logo" />
          <h1 class="text-xl font-bold">Weather App</h1>
        </div>
        <div class="flex justify-between mb-4">
          <span class="text-3xl font-bold">Locations</span>
          <UButton
            @click="openAddLocationForm"
            icon="i-heroicons-plus"
            size="sm"
            variant="solid"
            label="Add Location"
            :trailing="false"
            class="bg-custom-cyan text-black hover:bg-custom-cyan mb-4 hover:bg-blue-500"
          />
        </div>
      </div>
      <div class="m-12 mt-0">
        <UTable
          :loading="isLoading"
          :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: '' }"
          :progress="null"
          :columns="columns" :rows="locations" @select="selectLocationDetails">
          <template #empty-state>
            <div v-if="locations.length === 0" class="flex flex-col items-center justify-center py-6 gap-3">
              <span class="italic text-sm">No Location here!</span>
            </div>
          </template>
          <template #name-data="{ row }">
            <div class="flex flex-row gap-4">
              <img class="justify-self-center" :src="icons[getWeatherIcon(row.weather_code)]" alt="Weather Icon" />
              <span class="justify-self-center self-center">{{ row.name }}</span>
            </div>
          </template>
          <template #actions-data="{ row }">
            <UButton color="custom-gray" class="hover:text-red-600" variant="ghost" icon="i-heroicons-trash" @click.stop="selectLocation(row)" />
          </template>
        </UTable>
        <UModal
          v-model="showDeleteModal"
          prevent-close
          :ui="{
            overlay: {
              background: 'bg-custom-gray-dashboard/75 dark:bg-gray-800/75'
            }, background: 'bg-custom-gray dark:bg-gray-900'
          }"
        >
          <div class="p-6 bg-custom-gray rounded-lg">
            <div class="flex flex-row justify-between">
              <p class="text-white">Are you sure you want to remove this location?</p>
             <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 text-white" @click="showDeleteModal = false" />
            </div>
            <div class="mt-6 flex flex-col space-y-2">
              <UButton block color="gray" variant="solid" @click="showDeleteModal = false">Cancel</UButton>
              <UButton block color="red" variant="solid" @click="removeLocation(selectedLocationToRemove)">Delete</UButton>
            </div>
          </div>
        </UModal>
        <UModal
          v-model="showAddLocationModal"
          prevent-close
          :ui="{
            overlay: {
              background: 'bg-custom-gray-dashboard/75 dark:bg-gray-800/75'
            },  background: 'bg-custom-gray dark:bg-gray-900'
          }"
        >
          <div class="p-6">
            <div class="flex flex-row justify-between mb-4">
              <h2 class="text-xl text-white mb-2">Add Location</h2>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 text-white" @click="showAddLocationModal = false" />
            </div>
              <UInput
              v-model="searchQuery"
              @input="filterLocations"
              icon="i-heroicons-magnifying-glass-20-solid"
              size="sm"
              :trailing="false"
              placeholder="Search for the desired location..."
              class="mb-4 text-white"
              :ui= "{ 
                color: {
                    white: {
                        outline: 'shadow-sm bg-custom-gray-input dark:bg-gray-900 text-white-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
                    }
                }
              }"
            />
            <div v-if="filteredLocations.length" class="mb-2 text-white">
              <div v-for="location in filteredLocations" :key="location.id" @click="selectLocationToAdd(location)" class="cursor-pointer hover:bg-gray-600">
                {{ location.name }}
              </div>
            </div>
            <UButton block :loading="isAddingLocation" class="bg-custom-cyan text-black hover:bg-blue-500" variant="solid" @click="addLocation">Add Location</UButton>
          </div>
        </UModal>
      </div>
      <div class="bg-black">
        <ForecastSidebar :show="showSidebar" :location="selectedLocationDetails" @close="showSidebar = false" />
      </div>
    </div>
  </template>
  
  <script src="./Locations.ts"></script>
