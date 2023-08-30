<template>
	<ElUpload
		v-model:file-list="fileList"
		:drag="typeFileInput === 'dragable' ? true : false"
		:list-type="
			typeFileInput === 'dragable' || typeFileInput === 'button'
				? 'picture'
				: 'picture-card'
		"
		action="#"
		:multiple="multiple"
		:limit="limit"
		:accept="accept"
		:auto-upload="false"
		:on-preview="handlePictureCardPreview"
		:on-change="handleChange"
	>
		<div v-if="typeFileInput === 'dragable'">
			<ElIcon class="el-icon--upload"><upload-filled /></ElIcon>
			<div class="el-upload__text">
				{{ $lt("dropHere") }} <em>{{ $lt("clickToUpload") }}</em>
			</div>
		</div>
		<div v-else-if="typeFileInput === 'photoWall'">
			<ElIcon><Plus /></ElIcon>
		</div>
		<div v-else-if="typeFileInput === 'button'">
			<ElButton type="primary">{{ $lt("clickToUpload") }}</ElButton>
		</div>

		<template #file="{ file }">
			<ElRow justify="space-between" align="middle" style="width: 100%">
				<ElImage
					v-if="file.raw.type.split('/')[0] === 'image'"
					class="el-upload-list__item-thumbnail"
					ref="thumbnailImg"
					:src="getThumbnailSrc(file)"
					alt=""
					:preview-src-list="[getThumbnailSrc(file)]"
					preview-teleported
					fit="contain"
				/>
				<img
					v-else
					@click="handlePictureCardPreview(file)"
					class="el-upload-list__item-thumbnail"
					style="cursor: pointer"
					:src="getThumbnailSrc(file)"
				/>
				<div>{{ file.raw.name }}</div>
				<span class="el-upload-list__item-actions">
					<!-- <el-row justify="space-between" align="middle"> -->
					<!-- <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
						<el-icon size="20"><zoom-in /></el-icon>
					</span> -->
					<span
						:class="
							typeFileInput === 'photoWall' ? 'el-upload-list__item-delete' : ''
						"
						style="cursor: pointer"
						@click="handleRemove(file)"
					>
						<Icon name="ele-Delete" />
					</span>
				</span>
			</ElRow>
		</template>

		<template #tip>
			<div class="el-upload__tip">
				<div>{{ $lt("propSize") }}</div>
				<div v-if="props.accept">{{ $lt("propFormat") }}</div>
			</div>
		</template>
	</ElUpload>

	<ElDialog v-model="dialogVisible">
		<embed
			v-if="previewType === 'application'"
			:src="dialogImageUrl"
			width="600"
			height="400"
		/>
	</ElDialog>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";
import { Plus, UploadFilled } from "@element-plus/icons-vue";
import type { UploadFile, UploadProps, UploadUserFile } from "element-plus";
// import toast from "/@common/components/toast";
import {
	ElUpload,
	ElIcon,
	ElDialog,
	ElButton,
	ElImage,
	ElRow,
} from "element-plus";
import Icon from "./icon.vue";

const props = defineProps({
	typeFileInput: {
		type: String as PropType<"dragable" | "photoWall" | "button">,
		default: "dragable",
	},
	drag: Boolean,
	limit: Number,
	accept: String,
	multiple: Boolean,
	action: String,
	maxSize: Number,
	buttonName: String,
	t: { type: Function, required: true },
});
const $lt = props.t;

const emit = defineEmits(["fileChange"]);
const fileList = ref<UploadUserFile[]>([]);
const dialogImageUrl = ref("");
const previewType = ref("");
const dialogVisible = ref(false);
const thumbnailImg = ref();

const handleRemove = (file: UploadFile) => {
	fileList.value.splice(fileList.value.indexOf(file), 1);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
	if (uploadFile.raw) {
		const [fileType] = uploadFile.raw.type?.split("/");
		previewType.value = fileType;
		dialogImageUrl.value = uploadFile.url!;
		dialogVisible.value = true;
	}
};

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
	emit("fileChange", uploadFile);
	if (uploadFile.size && props.maxSize) {
		if (uploadFile.size / 1024 / 1024 > props.maxSize) {
			uploadFiles.pop();
			// toast.error($lt("error"), $lt("largerThanSize"));
		}
	}
};

const getThumbnailSrc = (file: any) => {
	if (file.raw) {
		const [fileType, fileFormat] = file.raw.type?.split("/");

		if (fileType === "image") return file.url;
		else if (fileType === "application" && fileFormat === "pdf") return pdf;
		else if (fileType === "audio") return audio;
		else if (fileType === "video") return video;
	}
};

const pdf =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAoxJREFUWEftmLuKAjEUhs94K0WwsBBLwUZ8DJ9CLBSxsREbLbwgiI2FD6CFIL6CTyG2WlpYiCBaWIiX5QybbMwmM5md2ZllmTTCJJPzzZ9zi9rr9XqBYGiaJnps69nz+QSr+2oiwOFwCM1m0xaM6OVwOAy3283SvkLAXq8H3W4XJOJaMoCLA4EA3SuXy8F6vVbew3VAJDsejxCPx5UgPQFEMtXT8QxQFdJTQBVIzwExgO73uzT9eA6IKgaDQR1SmI9FefA304wsdGezGRQKhW/Triholk+wumDe7XQ6PqCZWGI/+zcK7vd7SCaTP1LB7kuYbrDb2e12kEql6HY0SDabDWQyGbt2HHl/u91COp3W96KAbMchs0J6OdU6KtqHKGX2JcSGFFAG8Xg8IBQK0f2NYIvFImB+Y4fReraZ/TEgqZ+ohEot1Y+J6c4dByyVSjCdTnUYLEdYllijxCA6OJnDeb69F7mHkVspK8gCohE0rAKIa9EdCJgrgGiQHC1vkFeQByRqsUdsdIFSVpD4Gb+ZCmCtVoPxeCxUXBTFjgQJr5TMB1l3ELmEY4CVSgXm8zlcr1eqBHtMdgCJu4jSkPIRl8tlmEwm0rwqA8zn87BcLr9K1meqYT/OkShWBcQAikQikM1mYbVa0WAyyoOuAookRn9FaPwlyjmm4Pl81m1Wq1VYLBbSIz6dThCLxd7msenAgk8GC3W5XOjzaDRq6jq0FvM1VvqmCxNvuZK/NB0OBxgMBnr+wv7QjYE9KObMVqsFiURCdwdagUS3un6/D+12W/nvCbsfgcGC9vDixA/hrc4H5GTyFfR9kFfgzwfJaDSCRqNh9+QsvY826/W6WprBVSrXUEsEJotll6kPLanlp6cjizIAAAAASUVORK5CYII=";

const audio =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAsBJREFUWEftmUuITmEYx38TC0SJogizQnYkkho2FEozqbFw2Vu4LGwUuaU0wgbZKpGykaJMrA2yc125hKYJueWW6F/PU2+v93zzfecy31l87+6c7738znP9n/N10fqYDzxrfVnmiqfALmAwNaMrx0GfgSk51jVa8gdYl4JsBVCWe5CAOwl8LQC8ClgNvALmxfs0CzgNeG+LvwALgTd2PRt4WwDwEHDQ1v/H0wyg4B4DM22TBWaxWgCGCTEMLAI+ALPqYsEwIaYbnAzZdsAwIRRzS4HnQZy1HfBvAKMkiMcZoA/4AXQDcn/ekStJQsBGB18DevOS2bpKAD8Bt4FNBeG0vBCgivCpBMRvYKQEuMKAh+0JS2JJblPIgmUBTgBU8FMdpxaAQ8AyYAtwKbLjmAHOAK7b4RIAKkE+HFDXayPVMiaAe4AD5kZBxAJCLn5h/VxuDmtrpYA6eCcwELnNAVcamIRF2Nc3BtYuFXAqMCmAeQmMt2t1E1c8AlSnUcfRmGguPwrst3uupEoDVJBfBeYkisVlYG+kcKS6Jec1BCpLa86JqgAfAosjOFlNVjmboXBuAWsAJYkS5yfgbXQfcLxoJwnroG8cdhdlqvShRkrhpO75Psp4xWJpLvaNs4p3BzAMr5S1/J6Eq78X37cYzHKxx+A9i0GFhO+jbD5WposvANsTGfwLWAJ8jLJ4cvAg54EdgAr66aqyWEX5DrAiAfnN3vTCOrg5kGqqnd8zrFVakiS42AqcS7zMeyfZADyybqL6qZdzjco6SQpS945Yh/DuUJteHAKvty8EguyJ1MxdYLlNbouaybKs33e5tQ24GE2uNAZHA/PfXVG/C8qM/1YLwEYP0gFs1s1Z8zoWbIsFrwD9gMTAjaIEo6z3T8Cvgbnx3KwvrFLBN4FxFcP59rk+ogtyN6B+WuV4Yuck/4b4BwRQ9SnKe92fAAAAAElFTkSuQmCC";

const video =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAfpJREFUWEftmb8rRlEYxz9vJsquLDKQRWKQDFIoA6X8Af4HZbAgk8VuIovFIJSQWKSUko1BSQYLSski+ta9uq57zz33vO6P9J71Pue5n/s953nOeZ5bwTzagD5gLcHO9HgR2AXOXXxUDJN6gGOg0cVxaM470AI8pvUVB9gFnAINaR0m2A8CJ2l8xgF+Bpx8AKPAYRrHwAywFDGnKY2SNoAjDnDiqgfeIgC13AO2ezIKcBsY8xzfAO0plQuaB1ci7KbXBjIJcAGYzwjQKnCKBPS/2xg4ZQAUaGzglAUwNnDKAigV77xk/mPLlwlQYBPAVpAwa0Adk9MJWWAu8HwHGM8T0CZD7QM6DDRKCag866tYA7RZ0rBNpgrqzNbZrSvULHDmQJgLoM815W30pxSguQKKS7fmde8+aMOZO6APtQGsWtwlCwMUqG7jUrTZIGWhgD7XPdAJvESAlgLwGeiIqUUKB1RdvAI8xCxzYYBHwJBFGBcC2A1ceUGSxJgb4Cuw7FBkZQo4DGx6uW4ySaoi9qDe2QrcOsJpWqYKVsH1PbUGWK2K/1vBaptHNupeA+rkWhdNMgx2pVzbbzZwSlMHAcNfZbBNf9C1gZkEKLg9oM4FMKsWcBy0Gp39wGXYIK8muklNHZFqwV1EGZkAZf8XvyFMcCqyVAkqGCPHFztPvym19fDQAAAAAElFTkSuQmCC";

</script>

<style scoped>
.el-upload-list--picture-card .el-upload-list__item-actions {
	height: 25%;
}
.el-upload-list--picture-card .el-upload-list__item-actions span {
	display: inline-flex;
}

.el-upload-list--picture-card
	.el-upload-list__item:hover
	.el-upload-list__item-actions {
	opacity: 1;
}
</style>
