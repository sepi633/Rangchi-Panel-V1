<template>
    <div class="flex flex-wrap">
        <ModalDelete v-if="showModal==true" />

        <strong class="title flex w-full mb-2">درخت دسته بندی </strong>

        <ul class="parent-list flex bg-[#fff] p-4 items-start lg:w-full border
            ">
            <li class="px-2  flex items-center">
                <span> سرشاخه:{{ pageData?.name }}</span>
                <svg class="mx-2" width="5" height="20" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.70703 0.29535C8.8945 0.482878 8.99982 0.737186 8.99982 1.00235C8.99982 1.26751 8.8945 1.52182 8.70703 1.70935L2.41403 8.00235L8.70703 14.2953C8.88919 14.484 8.98998 14.7366 8.9877 14.9988C8.98543 15.2609 8.88026 15.5118 8.69485 15.6972C8.50944 15.8826 8.25863 15.9877 7.99643 15.99C7.73423 15.9923 7.48163 15.8915 7.29303 15.7094L0.293031 8.70935C0.10556 8.52182 0.000244141 8.26751 0.000244141 8.00235C0.000244141 7.73719 0.10556 7.48288 0.293031 7.29535L7.29303 0.29535C7.48056 0.107879 7.73487 0.00256348 8.00003 0.00256348C8.26519 0.00256348 8.5195 0.107879 8.70703 0.29535Z"
                        fill="black" />
                </svg>

            </li>

            <li class="px-2 ml-2 border-r ">
                <ul class="subcategory">
                    <li v-for="(item, index) in pageData?.children" :key="item" class="flex flex-wrap items-center">
                        <strong>{{ index + 1 }}.</strong>
                        <span>{{ item.name }} {{ item.id }}</span>

                        <div class="btn-box flex items-center justify-center w-[80px]  p-1 my-1">

                            

<button class="btn" @click="addSubCategory(item.id)">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 11.9995C3 10.8176 3.23279 9.64736 3.68508 8.55548C4.13738 7.46361 4.80031 6.4715 5.63604 5.63581C6.47177 4.80013 7.46392 4.13722 8.55585 3.68495C9.64778 3.23268 10.8181 2.9999 12 2.9999C13.1819 2.9999 14.3522 3.23268 15.4442 3.68495C16.5361 4.13722 17.5282 4.80013 18.364 5.63581C19.1997 6.4715 19.8626 7.46361 20.3149 8.55548C20.7672 9.64736 21 10.8176 21 11.9995C21 14.3863 20.0518 16.6754 18.364 18.3631C16.6761 20.0509 14.3869 20.999 12 20.999C9.61305 20.999 7.32387 20.0509 5.63604 18.3631C3.94821 16.6754 3 14.3863 3 11.9995ZM12 1C5.925 1 1 5.92476 1 11.9995C1 18.0742 5.925 22.9989 12 22.9989C18.075 22.9989 23 18.0742 23 11.9995C23 5.92476 18.075 1 12 1ZM13 6.99971C13 6.73451 12.8946 6.48016 12.7071 6.29264C12.5196 6.10511 12.2652 5.99976 12 5.99976C11.7348 5.99976 11.4804 6.10511 11.2929 6.29264C11.1054 6.48016 11 6.73451 11 6.99971V10.9995H7C6.73478 10.9995 6.48043 11.1049 6.29289 11.2924C6.10536 11.4799 6 11.7343 6 11.9995C6 12.2647 6.10536 12.519 6.29289 12.7065C6.48043 12.8941 6.73478 12.9994 7 12.9994H11V16.9992C11 17.2644 11.1054 17.5188 11.2929 17.7063C11.4804 17.8938 11.7348 17.9992 12 17.9992C12.2652 17.9992 12.5196 17.8938 12.7071 17.7063C12.8946 17.5188 13 17.2644 13 16.9992V12.9994H17C17.2652 12.9994 17.5196 12.8941 17.7071 12.7065C17.8946 12.519 18 12.2647 18 11.9995C18 11.7343 17.8946 11.4799 17.7071 11.2924C17.5196 11.1049 17.2652 10.9995 17 10.9995H13V6.99971Z" fill="black"/>
</svg>


                            </button>
                            <button class="btn" @click="getCategoryItem(item.id)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M21.121 2.707C20.5584 2.14459 19.7955 1.82864 19 1.82864C18.2045 1.82864 17.4416 2.14459 16.879 2.707L15.199 4.387L7.293 12.293C7.16494 12.421 7.07404 12.5814 7.03 12.757L6.03 16.757C5.98803 16.9246 5.99018 17.1002 6.03626 17.2667C6.08234 17.4332 6.17077 17.5849 6.29293 17.7071C6.41509 17.8292 6.56681 17.9177 6.73331 17.9637C6.89982 18.0098 7.07542 18.012 7.243 17.97L11.243 16.97C11.4186 16.926 11.579 16.8351 11.707 16.707L19.556 8.859L21.293 7.121C21.8554 6.55842 22.1714 5.7955 22.1714 5C22.1714 4.20451 21.8554 3.44159 21.293 2.879L21.121 2.707ZM18.293 4.121C18.4805 3.93353 18.7348 3.82822 19 3.82822C19.2652 3.82822 19.5195 3.93353 19.707 4.121L19.879 4.293C20.0665 4.48053 20.1718 4.73484 20.1718 5C20.1718 5.26517 20.0665 5.51948 19.879 5.707L18.862 6.724L17.307 5.107L18.293 4.121ZM15.893 6.521L17.448 8.138L10.488 15.097L8.374 15.626L8.903 13.511L15.893 6.521ZM4 8C4 7.73479 4.10536 7.48043 4.29289 7.2929C4.48043 7.10536 4.73478 7 5 7H10C10.2652 7 10.5196 6.89465 10.7071 6.70711C10.8946 6.51957 11 6.26522 11 6C11 5.73479 10.8946 5.48043 10.7071 5.2929C10.5196 5.10536 10.2652 5 10 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7957 19 19V14C19 13.7348 18.8946 13.4804 18.7071 13.2929C18.5196 13.1054 18.2652 13 18 13C17.7348 13 17.4804 13.1054 17.2929 13.2929C17.1054 13.4804 17 13.7348 17 14V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V8Z"
                                        fill="black" />
                                </svg>


                            </button>
                            <button class="btn" @click="deleteCategory(item.id)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8H18V18C18 18.7956 17.6839 19.5587 17.1213 20.1213C16.5587 20.6839 15.7956 21 15 21H9C8.20435 21 7.44129 20.6839 6.87868 20.1213C6.31607 19.5587 6 18.7956 6 18V8H5C4.73478 8 4.48043 7.89464 4.29289 7.70711C4.10536 7.51957 4 7.26522 4 7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H9V5ZM10 8H8V18C8 18.2652 8.10536 18.5196 8.29289 18.7071C8.48043 18.8946 8.73478 19 9 19H15C15.2652 19 15.5196 18.8946 15.7071 18.7071C15.8946 18.5196 16 18.2652 16 18V8H10ZM13 6H11V5H13V6ZM10 9C10.2652 9 10.5196 9.10536 10.7071 9.29289C10.8946 9.48043 11 9.73478 11 10V17C11 17.2652 10.8946 17.5196 10.7071 17.7071C10.5196 17.8946 10.2652 18 10 18C9.73478 18 9.48043 17.8946 9.29289 17.7071C9.10536 17.5196 9 17.2652 9 17V10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9ZM14 9C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10V17C15 17.2652 14.8946 17.5196 14.7071 17.7071C14.5196 17.8946 14.2652 18 14 18C13.7348 18 13.4804 17.8946 13.2929 17.7071C13.1054 17.5196 13 17.2652 13 17V10C13 9.73478 13.1054 9.48043 13.2929 9.29289C13.4804 9.10536 13.7348 9 14 9Z"
                                        fill="black" />
                                </svg>

                            </button>
                        </div>
                        <br>
                        <ul class="w-full ps-5 list-disc">
                            <li v-for="element in item.children" :key="element?.id"  class="flex flex-wrap items-center">
                             <span>{{ element.name }}</span>
                            
                                <div class="btn-box flex items-center justify-center w-[80px]  p-1 my-1">

                            

<button class="btn" @click="addSubCategory(element.id)">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 11.9995C3 10.8176 3.23279 9.64736 3.68508 8.55548C4.13738 7.46361 4.80031 6.4715 5.63604 5.63581C6.47177 4.80013 7.46392 4.13722 8.55585 3.68495C9.64778 3.23268 10.8181 2.9999 12 2.9999C13.1819 2.9999 14.3522 3.23268 15.4442 3.68495C16.5361 4.13722 17.5282 4.80013 18.364 5.63581C19.1997 6.4715 19.8626 7.46361 20.3149 8.55548C20.7672 9.64736 21 10.8176 21 11.9995C21 14.3863 20.0518 16.6754 18.364 18.3631C16.6761 20.0509 14.3869 20.999 12 20.999C9.61305 20.999 7.32387 20.0509 5.63604 18.3631C3.94821 16.6754 3 14.3863 3 11.9995ZM12 1C5.925 1 1 5.92476 1 11.9995C1 18.0742 5.925 22.9989 12 22.9989C18.075 22.9989 23 18.0742 23 11.9995C23 5.92476 18.075 1 12 1ZM13 6.99971C13 6.73451 12.8946 6.48016 12.7071 6.29264C12.5196 6.10511 12.2652 5.99976 12 5.99976C11.7348 5.99976 11.4804 6.10511 11.2929 6.29264C11.1054 6.48016 11 6.73451 11 6.99971V10.9995H7C6.73478 10.9995 6.48043 11.1049 6.29289 11.2924C6.10536 11.4799 6 11.7343 6 11.9995C6 12.2647 6.10536 12.519 6.29289 12.7065C6.48043 12.8941 6.73478 12.9994 7 12.9994H11V16.9992C11 17.2644 11.1054 17.5188 11.2929 17.7063C11.4804 17.8938 11.7348 17.9992 12 17.9992C12.2652 17.9992 12.5196 17.8938 12.7071 17.7063C12.8946 17.5188 13 17.2644 13 16.9992V12.9994H17C17.2652 12.9994 17.5196 12.8941 17.7071 12.7065C17.8946 12.519 18 12.2647 18 11.9995C18 11.7343 17.8946 11.4799 17.7071 11.2924C17.5196 11.1049 17.2652 10.9995 17 10.9995H13V6.99971Z" fill="black"/>
</svg>


                            </button>
                            <button class="btn" @click="getCategoryItem(element.id)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M21.121 2.707C20.5584 2.14459 19.7955 1.82864 19 1.82864C18.2045 1.82864 17.4416 2.14459 16.879 2.707L15.199 4.387L7.293 12.293C7.16494 12.421 7.07404 12.5814 7.03 12.757L6.03 16.757C5.98803 16.9246 5.99018 17.1002 6.03626 17.2667C6.08234 17.4332 6.17077 17.5849 6.29293 17.7071C6.41509 17.8292 6.56681 17.9177 6.73331 17.9637C6.89982 18.0098 7.07542 18.012 7.243 17.97L11.243 16.97C11.4186 16.926 11.579 16.8351 11.707 16.707L19.556 8.859L21.293 7.121C21.8554 6.55842 22.1714 5.7955 22.1714 5C22.1714 4.20451 21.8554 3.44159 21.293 2.879L21.121 2.707ZM18.293 4.121C18.4805 3.93353 18.7348 3.82822 19 3.82822C19.2652 3.82822 19.5195 3.93353 19.707 4.121L19.879 4.293C20.0665 4.48053 20.1718 4.73484 20.1718 5C20.1718 5.26517 20.0665 5.51948 19.879 5.707L18.862 6.724L17.307 5.107L18.293 4.121ZM15.893 6.521L17.448 8.138L10.488 15.097L8.374 15.626L8.903 13.511L15.893 6.521ZM4 8C4 7.73479 4.10536 7.48043 4.29289 7.2929C4.48043 7.10536 4.73478 7 5 7H10C10.2652 7 10.5196 6.89465 10.7071 6.70711C10.8946 6.51957 11 6.26522 11 6C11 5.73479 10.8946 5.48043 10.7071 5.2929C10.5196 5.10536 10.2652 5 10 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7957 19 19V14C19 13.7348 18.8946 13.4804 18.7071 13.2929C18.5196 13.1054 18.2652 13 18 13C17.7348 13 17.4804 13.1054 17.2929 13.2929C17.1054 13.4804 17 13.7348 17 14V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V8Z"
                                        fill="black" />
                                </svg>


                            </button>
                            <button class="btn" @click="deleteCategory(element.id)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8H18V18C18 18.7956 17.6839 19.5587 17.1213 20.1213C16.5587 20.6839 15.7956 21 15 21H9C8.20435 21 7.44129 20.6839 6.87868 20.1213C6.31607 19.5587 6 18.7956 6 18V8H5C4.73478 8 4.48043 7.89464 4.29289 7.70711C4.10536 7.51957 4 7.26522 4 7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H9V5ZM10 8H8V18C8 18.2652 8.10536 18.5196 8.29289 18.7071C8.48043 18.8946 8.73478 19 9 19H15C15.2652 19 15.5196 18.8946 15.7071 18.7071C15.8946 18.5196 16 18.2652 16 18V8H10ZM13 6H11V5H13V6ZM10 9C10.2652 9 10.5196 9.10536 10.7071 9.29289C10.8946 9.48043 11 9.73478 11 10V17C11 17.2652 10.8946 17.5196 10.7071 17.7071C10.5196 17.8946 10.2652 18 10 18C9.73478 18 9.48043 17.8946 9.29289 17.7071C9.10536 17.5196 9 17.2652 9 17V10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9ZM14 9C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10V17C15 17.2652 14.8946 17.5196 14.7071 17.7071C14.5196 17.8946 14.2652 18 14 18C13.7348 18 13.4804 17.8946 13.2929 17.7071C13.1054 17.5196 13 17.2652 13 17V10C13 9.73478 13.1054 9.48043 13.2929 9.29289C13.4804 9.10536 13.7348 9 14 9Z"
                                        fill="black" />
                                </svg>

                            </button>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>

                    </li>
                </ul>
                <button class="btn border p-2 rounded px-4 flex items-center bg-[#eee] h-[50px]"
                    :class="{ 'hidden': addStatus == true }" @click="addStatus = !addStatus">
                    <svg class="ml-2" width="22" height="22" viewBox="0 0 22 22" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M2 10.9995C2 9.81763 2.23279 8.64736 2.68508 7.55548C3.13738 6.46361 3.80031 5.4715 4.63604 4.63581C5.47177 3.80013 6.46392 3.13722 7.55585 2.68495C8.64778 2.23268 9.8181 1.9999 11 1.9999C12.1819 1.9999 13.3522 2.23268 14.4442 2.68495C15.5361 3.13722 16.5282 3.80013 17.364 4.63581C18.1997 5.4715 18.8626 6.46361 19.3149 7.55548C19.7672 8.64736 20 9.81763 20 10.9995C20 13.3863 19.0518 15.6754 17.364 17.3631C15.6761 19.0509 13.3869 19.999 11 19.999C8.61305 19.999 6.32387 19.0509 4.63604 17.3631C2.94821 15.6754 2 13.3863 2 10.9995ZM11 0C4.925 0 0 4.92476 0 10.9995C0 17.0742 4.925 21.9989 11 21.9989C17.075 21.9989 22 17.0742 22 10.9995C22 4.92476 17.075 0 11 0ZM12 5.99971C12 5.73451 11.8946 5.48016 11.7071 5.29264C11.5196 5.10511 11.2652 4.99976 11 4.99976C10.7348 4.99976 10.4804 5.10511 10.2929 5.29264C10.1054 5.48016 10 5.73451 10 5.99971V9.99952H6C5.73478 9.99952 5.48043 10.1049 5.29289 10.2924C5.10536 10.4799 5 10.7343 5 10.9995C5 11.2647 5.10536 11.519 5.29289 11.7065C5.48043 11.8941 5.73478 11.9994 6 11.9994H10V15.9992C10 16.2644 10.1054 16.5188 10.2929 16.7063C10.4804 16.8938 10.7348 16.9992 11 16.9992C11.2652 16.9992 11.5196 16.8938 11.7071 16.7063C11.8946 16.5188 12 16.2644 12 15.9992V11.9994H16C16.2652 11.9994 16.5196 11.8941 16.7071 11.7065C16.8946 11.519 17 11.2647 17 10.9995C17 10.7343 16.8946 10.4799 16.7071 10.2924C16.5196 10.1049 16.2652 9.99952 16 9.99952H12V5.99971Z"
                            fill="black" />
                    </svg>
                    <span class="whitespace-nowrap"> افزودن آیتم جدید</span>
                </button>
            </li>

        </ul>

    </div>

    <div class="insert-box flex flex-wrap " :class="{ 'hidden': addStatus == false }">
        <strong class="title flex w-full">افزودن آیتم</strong>
        <div class="bg-[#fff] mt-4 p-4 w-full flex flex-wrap insert-box border">

            <div class="input-box flex flex-col lg:w-1/6 p-1">
                <label for="">شناسه پدر:</label>
                <input class="border w-full h-[40px] mt-2" type="text" name="" readonly v-model="newCategory.parentId" id="">
            </div>
            <div class="input-box flex flex-col lg:w-1/6 p-1">
                <label for=""> اولویت نمایش:</label>
                <input class="border w-full h-[40px] mt-2" type="text" name="" :value="newCategory.priority" id="">
            </div>
            <div class="input-box flex flex-col lg:w-2/6 p-1">
                <label for="">عنوان:</label>
                <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newCategory.name" id="">
            </div>
            <div class="input-box flex flex-col lg:w-2/6 p-1">
                <label for="">برچسب:</label>
                <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newCategory.label" id="">
            </div>

        </div>
        <div class="bg-[#fff] mt-4 p-4 lg:w-6/12 insert-box border ml-auto flex">


            <div class="input-box flex flex-col lg:w-3/6 p-1">
                <img class="w-100" :src="picture.img" alt="">
                <label class="image-place" for="image">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3 6.99747C3 6.20182 3.31607 5.43876 3.87868 4.87615C4.44129 4.31354 5.20435 3.99747 6 3.99747H18C18.7956 3.99747 19.5587 4.31354 20.1213 4.87615C20.6839 5.43876 21 6.20182 21 6.99747V18.9975C21 19.7931 20.6839 20.5562 20.1213 21.1188C19.5587 21.6814 18.7956 21.9975 18 21.9975H6C5.20435 21.9975 4.44129 21.6814 3.87868 21.1188C3.31607 20.5562 3 19.7931 3 18.9975V6.99747ZM19 6.99747V15.5835L15.707 12.2905C15.5195 12.103 15.2652 11.9977 15 11.9977C14.7348 11.9977 14.4805 12.103 14.293 12.2905L13 13.5835L9.207 9.79047C9.01947 9.603 8.76516 9.49768 8.5 9.49768C8.23484 9.49768 7.98053 9.603 7.793 9.79047L5 12.5835V6.99747C5 6.73225 5.10536 6.4779 5.29289 6.29036C5.48043 6.10282 5.73478 5.99747 6 5.99747H18C18.2652 5.99747 18.5196 6.10282 18.7071 6.29036C18.8946 6.4779 19 6.73225 19 6.99747ZM5 18.9975V15.4115L8.5 11.9115L12.293 15.7045C12.4805 15.8919 12.7348 15.9973 13 15.9973C13.2652 15.9973 13.5195 15.8919 13.707 15.7045L15 14.4115L19 18.4115V18.9975C19 19.2627 18.8946 19.517 18.7071 19.7046C18.5196 19.8921 18.2652 19.9975 18 19.9975H6C5.73478 19.9975 5.48043 19.8921 5.29289 19.7046C5.10536 19.517 5 19.2627 5 18.9975ZM14.5 10.9975C14.8978 10.9975 15.2794 10.8394 15.5607 10.5581C15.842 10.2768 16 9.89529 16 9.49747C16 9.09964 15.842 8.71811 15.5607 8.43681C15.2794 8.1555 14.8978 7.99747 14.5 7.99747C14.1022 7.99747 13.7206 8.1555 13.4393 8.43681C13.158 8.71811 13 9.09964 13 9.49747C13 9.89529 13.158 10.2768 13.4393 10.5581C13.7206 10.8394 14.1022 10.9975 14.5 10.9975Z"
                            fill="black" />
                    </svg>

                    عکس دسته بندی</label>
                <input id="image" class="border w-full h-[40px] mt-2" type="file" name="image" accept="image/*"
                    @change="imageChange" />
            </div>
            <div class="input-box flex flex-col lg:w-3/6 p-1">
                <img class="w-100 bg-[#bdbdbd]" :src="picture.icon" alt="">

                <label class="image-place " for="icon" v-if="!picture.icon">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M2.93625 10.8168C2.93625 8.71126 3.77575 6.69196 5.27006 5.20312C6.76438 3.71428 8.79111 2.87786 10.9044 2.87786C13.0177 2.87786 15.0444 3.71428 16.5387 5.20312C18.033 6.69196 18.8725 8.71126 18.8725 10.8168C18.8725 12.9223 18.033 14.9416 16.5387 16.4305C15.0444 17.9193 13.0177 18.7557 10.9044 18.7557C8.79111 18.7557 6.76438 17.9193 5.27006 16.4305C3.77575 14.9416 2.93625 12.9223 2.93625 10.8168ZM10.9044 0.893127C5.40338 0.893127 0.944214 5.33595 0.944214 10.8168C0.944214 16.2976 5.40338 20.7405 10.9044 20.7405C16.4054 20.7405 20.8646 16.2976 20.8646 10.8168C20.8646 5.33595 16.4054 0.893127 10.9044 0.893127ZM12.9293 16.0327C12.9952 16.2876 13.16 16.506 13.3876 16.6398C13.5002 16.706 13.6248 16.7495 13.7544 16.7678C13.8839 16.786 14.0158 16.7787 14.1424 16.7462C14.2691 16.7137 14.3881 16.6566 14.4927 16.5783C14.5972 16.4999 14.6853 16.4018 14.7518 16.2896C14.8183 16.1774 14.8619 16.0532 14.8802 15.9241C14.8986 15.7951 14.8912 15.6637 14.8586 15.5375C14.4213 13.7949 12.6146 12.8015 10.9044 12.8015C9.1265 12.8015 7.46614 13.8058 6.9502 15.5405C6.89131 15.7931 6.934 16.0586 7.06915 16.2803C7.2043 16.5019 7.42116 16.662 7.67331 16.7263C7.92547 16.7907 8.19288 16.7541 8.41831 16.6245C8.64374 16.4948 8.80927 16.2824 8.87949 16.0327C9.13845 15.1693 10.0677 14.7863 10.9044 14.7863C11.741 14.7863 12.6693 15.1683 12.9293 16.0327ZM9.41036 8.83206C9.41036 9.22685 9.25296 9.60547 8.97277 9.88463C8.69259 10.1638 8.31258 10.3206 7.91634 10.3206C7.5201 10.3206 7.14008 10.1638 6.8599 9.88463C6.57972 9.60547 6.42231 9.22685 6.42231 8.83206C6.42231 8.43727 6.57972 8.05865 6.8599 7.7795C7.14008 7.50034 7.5201 7.34351 7.91634 7.34351C8.31258 7.34351 8.69259 7.50034 8.97277 7.7795C9.25296 8.05865 9.41036 8.43727 9.41036 8.83206ZM13.8924 10.3206C14.2887 10.3206 14.6687 10.1638 14.9489 9.88463C15.2291 9.60547 15.3865 9.22685 15.3865 8.83206C15.3865 8.43727 15.2291 8.05865 14.9489 7.7795C14.6687 7.50034 14.2887 7.34351 13.8924 7.34351C13.4962 7.34351 13.1162 7.50034 12.836 7.7795C12.5558 8.05865 12.3984 8.43727 12.3984 8.83206C12.3984 9.22685 12.5558 9.60547 12.836 9.88463C13.1162 10.1638 13.4962 10.3206 13.8924 10.3206Z"
                            fill="black" />
                    </svg>

                    آیکن دسته بندی<input id="icon" class="border w-full hidden h-[40px] mt-2" type="file" name="icon" accept="image/*" 
                    @change="imageChange('icon')" />
                </label>
                
            </div>

        </div>
        <div class="bg-[#fff] mt-4 p-4 lg:w-6/12 insert-box border">

            <div class="input-box flex flex-col w-full p-1">
                <label for="">خلاصه:</label>
                <textarea class="border w-full h-100 mt-2" type="text" name="" v-model="newCategory.summary"
                    id=""></textarea>
            </div>
        </div>
        <div class="bg-[#fff] mt-4 p-4 w-full insert-box border">

            <div class="input-box flex flex-col w-full p-1">
                <label for="">محتوا:</label>
                <RichEditor v-model="newCategory.description" />
            </div>
        </div>
        <div class="bg-[#fff] mt-4 p-4 w-full insert-box border flex flex-wrap">

            <div class="input-box flex flex-col lg:w-2/6 p-1">
                <label for=""> هدینگ اول:<sub>(SEO H1)</sub></label>
                <input class="border w-full h-[40px] mt-2" type="text" name="" id="" v-model="newCategory.seoH1">

            </div>
            <div class="input-box flex flex-col lg:w-2/6 p-1">
                <label for=""> نام تصویر:<sub>(SEO Alt)</sub></label>
                <input class="border w-full h-[40px] mt-2" type="text" name="" id="" v-model="newCategory.seoPictureAlt">

            </div>
            <div class="input-box flex flex-col lg:w-2/6 p-1">
                <label for=""> متن آدرس:<sub>(SEO URL)</sub></label>
                <input class="border w-full h-[40px] mt-2" type="text" name="" id="" v-model="newCategory.seoUrlText">

            </div>
            <div class="input-box flex flex-col lg:w-2/6 p-1">
                <label for=""> عنوان :<sub>(SEO Title)</sub></label>
                <input class="border w-full h-[40px] mt-2" type="text" name="" id="" v-model="newCategory.seoTitle">

            </div>
            <div class="input-box flex flex-col lg:w-2/6 p-1">
                <label for=""> کنونیکال :<sub>(SEO Canonical)</sub></label>
                <input class="border w-full h-[40px] mt-2" type="text" name="" id="" v-model="newCategory.seoCanonical">

            </div>
            <div class="input-box flex flex-col lg:w-1/6 p-1">
                <label for=""> نوایندکس :<sub>(SEO NoIndex)</sub></label>
                <div class="flex justify-start items-center pt-3">
                    <input class="border   mx-2" type="radio" name="nofollow" id="r3"
                        @change="newCategory.seoNoIndex = true">
                    <label for="r3">هست</label>
                    <input class="border  mx-2" type="radio" name="nofollow" id="r4"
                        @change="newCategory.seoNoIndex = false">

                    <label for="r4">نیست</label>
                </div>

            </div>
            <div class="input-box flex flex-col lg:w-1/6 p-1">
                <label for=""> نوفالو :<sub>(SEO NoFollow)</sub></label>
                <div class="flex justify-start items-center pt-3">
                    <input class="border   mx-2" type="radio" name="nofollow" id="r3"
                        @change="newCategory.seoNoFollow = true">
                    <label for="r3">هست</label>
                    <input class="border  mx-2" type="radio" name="nofollow" id="r4"
                        @change="newCategory.seoNoFollow = false">

                    <label for="r4">نیست</label>
                </div>

            </div>

        </div>
        <div class="bg-[#fff] mt-4 p-4 lg:w-4/12 insert-box border">

            <div class="input-box flex flex-col w-full p-1">
                <label for="">خلاصه:</label>
                <textarea class="border w-full h-100 mt-2" type="text" name="" id=""></textarea>
            </div>
        </div>
        <div class="bg-[#fff] mt-4 p-4 lg:w-8/12 insert-box border">

            <div class="input-box flex flex-col w-full p-1">
                <label for="">توضیحات:</label>
                <RichEditor v-model="newCategory.seoDescription" />
            </div>
        </div>
        <div class="submit-box flex flex-wrap justify-end w-full">
            <div class="flex justify-start ml-auto lg:w-4/12 items-center pt-3">
                <input class="border   mx-2" type="checkbox" id="active">
                <label for="active" @click="!newCategory.active">میخواهم در سایت نمایش دهد.</label>

            </div>
            <button class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white ">انصراف</button>

            <button class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white " @click="submitInfo('insert')">ثبت</button>
            <button class="btn bg-[#2563eb] w-2/12 my-3 px-3 py-1 text-white " @click="submitInfo('edite')">ویرایش</button>
        </div>
    </div>
</template>

<script setup>
const {public: { imageUploaderUrl }} = useRuntimeConfig();
const route = useRoute()
const pageData = ref();
const showModal = ref(false)
const addStatus = ref(false)
const newCategory = ref({
    "name": "",
    "summary": "",
    "description": "",
    "seoH1": "",
    "seoMinDescription": "",
    "seoDescription": "",
    "seoTitle": "",
    "seoPictureAlt": "",
    "seoUrlText": "",
    "seoNoIndex": true,
    "seoNoFollow": true,
    "seoCanonical": "",
    "parentId": 0,
    "label": "",
    "priority": 0,
    "active": true,
    "pictureId": null,
    "iconId": null
})
const picture = ref({
    img: null,
    icon: null,
})
onMounted(() => {
    if(route.params.id!='new'){
        pageLoader();
        newCategory.value.parentId = route.params.id
    }
})

const pageLoader = async () => {
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/category/category', {
            method: 'GET',
            headers,
            query: {
                parentId: route.params.id
            }
        })

        

        pageData.value = data.list
        // newCategory.value.parentId = pageData?.value.parentId
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

const imageChange = async (e,type) => {
    // target.value = e.target.files[0];
    // value.value =  e.target.value;
    // formData.append("avatar", e.target.files[0], e.target.value)
    ;
    ;

    if (e.target.name == "image") {
        picture.value.img = URL.createObjectURL(e.target.files[0]);

    } else if (e.target.name == "icon") {
        picture.value.icon = URL.createObjectURL(e.target.files[0]);

    }

    try {
    const insert = await $fetch(imageUploaderUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
      },
    });

    if(type=="icon"){
        alert("sss")
    }
    
  } catch (error) {
    ;
  }
    // )
}
const confirmUpload = async () => {
  loader.value = true;
  ;
  ;
  ;

  const formData = new FormData();
  formData.append("PictureFile", orgFile.value, orgLocation.value);
  ;
  try {
    const insert = await $fetch(imageUploaderUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
      },
    });

    loader.value=false
    emit('getPictureId',picId)
    // pageLoader()
    ;
    picId.value = insert?.data?.id;
    confirmtStatus.value = true;
  } catch (error) {
    ;
  }
};
// const submitInfo=async()=>{
//     formData.append("avatar", target.value, value.value)
//     try {
//         const user = await $fetch(('https://api.persianball.ir/v1/user/' ), {
//             method: "POST",
//             body: formData,

//             headers: {
//                 'Accept': 'application/json',
//                 'X-CSRFToken': 'Gl7qJ5EIHUP0fHkKN3Cwi9KPKzql0isU8qMZbp5VgpUlOUGqPp8TEFHZNMurbiXT',
//                 "AUTHORIZATION": key.value
//             }
//         })
//         ;

//     } catch (error) {
//         ;

//     }
//     // 
//     // try {
//     //     const user = await $fetch(('/api/auth/user'), {
//     //         method: "POST",
//     //         body: {
//     //             avatar: image.value
//     //         },

//     //         headers: {
//     //             'Accept': 'application/json'
//     //         }
//     //     })
//     //     ;

//     // } catch (error) {
//     //     ;

//     // }
// }

const submitInfo = async (type) => {
    ;
    if(type=='insert'){
        try {
        const headers = useRequestHeaders(['cookie'])
        const insert = await $fetch(('/api/category/category'), {
            method: "POST",
            body: newCategory.value,
            headers: {
                'Accept': 'application/json'
            }
        })

        pageLoader()
        resetForm()

    } catch (error) {
        ;
    }
    finally{
        addStatus.value=false;
        
    }
    }
    if(type=='edite'){
        try {
        const headers = useRequestHeaders(['cookie'])
        const insert = await $fetch(('/api/category/category'), {
            method: "PUT",
            body: newCategory.value,
            headers: {
                'Accept': 'application/json'
            }
        })

        pageLoader()
        resetForm()

    } catch (error) {
        ;
    }
    finally{
        addStatus.value=false;
        
    }
    }
    
}

const getCategoryItem = async (id) => {

    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/category/category', {
            method: 'GET',
            headers,
            query: {
                parentId: id
            }
        })
        addStatus.value = true


        newCategory.value=data.list
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

const resetForm = ()=>{
    newCategory.value={"name": "",
    "summary": "",
    "description": "",
    "seoH1": "",
    "seoMinDescription": "",
    "seoDescription": "",
    "seoTitle": "",
    "seoPictureAlt": "",
    "seoUrlText": "",
    "seoNoIndex": true,
    "seoNoFollow": true,
    "seoCanonical": "",
    "parentId": route.params.id,
    "label": "",
    "priority": 0,
    "active": false,
    "pictureId": null,
    "iconId": null}
}

const addSubCategory = (id)=>{
    addStatus.value = true
    newCategory.value.parentId = id
}

const deleteCategory = async (id) => {

    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/category/category', {
            method: 'DELETE',
            headers,
            query: {
                catId: id
            }
        })
        pageLoader()


    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

</script>

<style lang="scss" scoped>
.subcategory {
    li {

        .btn-box {
            opacity: 0;
            transition: 0.2s;
            width: max-content;
            svg {
                path {
                    fill: #a0a0a0;
                }
            }

            .btn {
                &:hover {

                    svg {
                        path {
                            fill: #363636;
                        }
                    }
                }
            }
        }

        &:hover {
            &>.btn-box {

                opacity: 1;

            }
        }
    }
}

.image-place {
    border: 3px dashed #a0a0a0;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

// #136b57</style>