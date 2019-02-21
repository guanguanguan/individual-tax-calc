<template>
	<el-container>
		<el-header id="hr-header">
			<el-row>
				<el-col :span="1">
					<div class="grid-content"></div>
				</el-col>
				<el-col :span="1">
					<div class="grid-content">
						<img id="header-img" height="40" src="../../static/pics/header_img.jpeg" />
					</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content">
						左左 & HR小工具
					</div>
				</el-col>
				<el-col :span="13">
					<div class="grid-content"></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content">
						<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#409EFF" text-color="#fff"
						 active-text-color="#DCDFE6">
							<el-menu-item index="1">2019 新个税计算器</el-menu-item>
							<el-submenu index="2">
								<template slot="title">其他</template>
								<el-menu-item index="2-1">做个啥呢</el-menu-item>
								<el-menu-item index="2-2">还得再想想</el-menu-item>
								<el-menu-item index="2-3">........</el-menu-item>
							</el-submenu>
						</el-menu>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<el-row>
				<el-col :span="2">
					<div class="grid-content"></div>
				</el-col>
				<el-col :span="20">
					<el-row>
						<el-col :span="24">
							<div id="individual-tax-title" class="grid-content">2019 新个税</div>
						</el-col>
					</el-row>
					<el-row id="tax-main">
						<el-col :span="8" id="tax-input-content">
							<el-form ref="form" :model="form" label-width="80px">
								<el-form-item label="税前工资">
									<el-input v-model="form.salary"></el-input>
								</el-form-item>
								<el-form-item label="社保">
									<el-input v-model="form.insurance"></el-input>
								</el-form-item>
								<el-form-item label="公积金">
									<el-input v-model="form.fund"></el-input>
								</el-form-item>
								<el-form-item label="专项扣除">
									<el-input v-model="form.deduction"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button id="tax-calc-btn" type="primary" @click="onSubmit">计算</el-button>
								</el-form-item>
							</el-form>
						</el-col>
						<el-col :span="2">
							<div class="grid-content"></div>
						</el-col>
						<el-col :span="14" id="tax-output-content">
							<el-row :gutter="24">
								<el-col :span="24">
									<el-card shadow="hover">
										<template v-for='item in taxList'>
											{{ item.month }}月预扣税额:{{ item.salary }}×1-{{ item.insurance }}×1-{{ item.deduction }}×1-{{ item.base }}×1={{ item.taxTotal }}×{{ item.rate }}%-{{ item.number }}={{ item.realTax }}元
											<br />
											{{ item.month }}月实发工资:{{ item.salary }}-{{ item.insurance }}-{{ item.realTax }}={{ item.realSalary }}
											<br /><br />
										</template>
									</el-card>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="2">
					<div class="grid-content"></div>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
	import IndividualIncomeTaxAlg from '@/modules/individual-income-tax'

	export default {
		name: 'Index',
		data() {
			return {
				form: {
					salary: '',
					insurance: '',
					fund: '',
					deduction: ''
				},
				taxList: []
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			onSubmit() {
				let result = IndividualIncomeTaxAlg.calc(this.form.salary, this.form.insurance, this.form.fund, this.form.deduction);
				if (result) {
					this.taxList = result;
				} else {
					this.$message({
						showClose: true,
						message: '工资必须大于 5000 哦!',
						type: 'error'
					});
				}
			}
		}
	}
</script>

<style scoped>
	.el-header,
	.el-footer {
		background-color: #409EFF;
		color: #fff;
		line-height: 60px;
	}

	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	#header-img {
		display: block;
		margin-top: 10px;
		border-radius: 20px;
	}

	.el-main {
		padding-top: 50px;
	}

	#tax-input-content {}

	#tax-output-content {
		font-size: 0.9em;
	}

	#tax-main {
		padding-top: 50px;
	}

	#tax-calc-btn {
		width: 100%;
	}

	#individual-tax-title {
		text-align: center;
		font-size: 24px;
	}
</style>
