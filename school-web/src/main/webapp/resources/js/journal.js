$(function() {
		$("#submitSearch").click();
});

$("#groupNumberSelect").change(
		function() {
			$.ajax({
				url : 'journal-letter',
				type : 'post',
				data : $("#groupNumberSelect").val(),

				success : function(groupLetters) {
					var content = " ";
					for (letter in groupLetters) {
						content += "<option value=\"" + groupLetters[letter]
								+ "\">" + groupLetters[letter] + "</option>\n";
					}
					$("#groupLetterSelect").html(content);
				}
			});
		});

$("#subjectSelect").change(
		function() {
			$.ajax({
				url : 'journal-subject',
				type : 'post',
				data : $("#subjectSelect").val(),

				success : function(groupNumbers) {
					var content = " ";
					for (number in groupNumbers) {
						content += "<option value=\"" + groupNumbers[number]
								+ "\">" + groupNumbers[number] + "</option>\n";
					}
					$("#groupNumberSelect").html(content);
					$.ajax({
						url : 'journal-letter',
						type : 'post',
						data : $("#groupNumberSelect").val(),

						success : function(groupLetters) {
							var content = " ";
							for (letter in groupLetters) {
								content += "<option value=\""
										+ groupLetters[letter] + "\">"
										+ groupLetters[letter] + "</option>\n";
							}
							$("#groupLetterSelect").html(content);
						}
					});
				}
			});
		});

$("#submitSearch")
		.click(
				function() {
					var subject = $("#subjectSelect").val();
					var groupNumber = $("#groupNumberSelect").val();
					var groupLetter = $("#groupLetterSelect").val();
					var quarter = $("#quarterSelect").val();
					var json = {
						"subject" : subject,
						"groupNumber" : groupNumber,
						"groupLetter" : groupLetter,
						"quarter" : quarter
					}
					$
							.ajax({
								url : 'journal-group-marks',
								type : 'POST',
								data : JSON.stringify(json),
								dataType : 'json',
								contentType : 'application/json',
								mimeType : 'application/json',
								success : function(groupMarks) {
									var contentStd = "";
									contentStd += "<tr class=\"info "
											+ "trHeaderRow\">"
											+ "<th> Students </th></tr>";
									for ( var student in groupMarks) {
										contentStd += "<tr class=\"trSize\"><th>";
										var studentWithMark = groupMarks[student];
										contentStd += studentWithMark.studentName
												+ "</th></tr>";
									}
									$("#studentsNamesOfGroup").html(contentStd);
									var dates = groupMarks[0].markList;
									var curDate = new Date(groupMarks[0].date);
									curDate.setHours(0, 0, 0, 0);
									var contentMarks = "";
									contentMarks += "<tr class=\"info "
											+ "trHeaderRow\">";
									for ( var date in dates) {
										var dateOfMark = new Date(
												dates[date].date);
										contentMarks += "<th " + "class=\""
												+ dates[date].scheduleId;
										if (dateOfMark > curDate) {
											contentMarks += " futureDate\""
													+ "data-toggle=\"modal\""
													+ "data-target=\""
													+ ".journal-add-mark-modal";
										} else if (dateOfMark < curDate) {
											contentMarks += " previousDate";
										} else {
											contentMarks += " currentDate";
										}
										contentMarks += "\" data-value=\""
												+ dates[date].scheduleId
												+ "\">"
										dateOfMark = (dateOfMark.getDate()
												+ "."
												+ (dateOfMark.getMonth() + 1)
												+ "." + (dateOfMark.getYear() - 100));
										contentMarks += dateOfMark + "</th>";
									}
									contentMarks += "</tr>";
									for ( var student in groupMarks) {
										contentMarks += "<tr class=\"trSize\">";
										var studentId = groupMarks[student].studentId;
										var marks = groupMarks[student].markList;

										var currentDate = new Date(
												groupMarks[0].date);
										currentDate = (currentDate.getDate()
												+ "."
												+ (currentDate.getMonth() + 1)
												+ "." + (currentDate.getYear() - 100));

										for ( var index in marks) {
											var dateOfMark = new Date(
													marks[index].date);
											dateOfMark = (dateOfMark.getDate()
													+ "."
													+ (dateOfMark.getMonth() + 1)
													+ "." + (dateOfMark
													.getYear() - 100));
											var scheduleId = marks[index].scheduleId;
											if (marks[index].mark == 0
													&& currentDate == dateOfMark) {
												contentMarks += "<td name=\""
														+ "mark"
														+ scheduleId
														+ "\" "
														+ "id=\""
														+ studentId
														+ "j"
														+ scheduleId
														+ "\" data-value=\""
														+ studentId
														+ "j"
														+ scheduleId
														+ "\"class=\"tdCenter addMark";
												if (marks[index].markCoefficient == 3) {
													contentMarks += " eventTest"
												} else if (marks[index].markCoefficient == 5) {
													contentMarks += " eventExam"
												}

												contentMarks += "\" >"
														+ "<input id=\"dateAndStudent\""
														+ " type=\"hidden\" value=\" \" />"
														+ "<ul class=\"nav nav-pills"
														+ " pillsSizeForMark\">"
														+ "<li role=\"presentation\""
														+ " class=\"dropdown\"><a "
														+ "class=\"btn2 dropdown-toggle"
														+ " markItemCnfg\""
														+ " data-toggle=\"dropdown\""
														+ "> </a>"
														+ "<ul class=\"dropdown-menu\""
														+ " role=\"menu\">"
												for (var i = 1; i <= 12; i++) {
													contentMarks += "<li class=\""
															+ "selectOfMarkCnfg"
															+ " selectedMark\""
															+ " data-value=\""
															+ i
															+ "\">"
															+ " <a class=\""
															+ "selectOfMarkCnfg \">"
															+ i + "</a> </li>"
												}
												contentMarks += "<li class=\"divider\">"
														+ " </li>"
														+ "<li class=\"selectOfMarkCnfg"
														+ " selectedMark\" data-value=\"-1\">"
														+ "<a class=\"selectOfMarkCnfg\""
														+ ">Absent </a> </li>"
														+ "</ul></li></ul></td>";
											} else if (marks[index].mark == (-1)) {
												contentMarks += "<td name=\""
														+ "mark"
														+ scheduleId
														+ "\" class=\"tdCenter "
														+ scheduleId;
												if (marks[index].markCoefficient == 3) {
													contentMarks += " eventTest"
												} else if (marks[index].markCoefficient == 5) {
													contentMarks += " eventExam"
												}
												contentMarks += "\"> n/a </td>";
											} else if (marks[index].mark == 0
													&& currentDate != dateOfMark) {
												contentMarks += "<td name=\""
														+ "mark"
														+ scheduleId
														+ "\" class=\"tdCenter "
														+ scheduleId;
												if (marks[index].markCoefficient == 3) {
													contentMarks += " eventTest"
												} else if (marks[index].markCoefficient == 5) {
													contentMarks += " eventExam"
												} else {
													console
															.log(marks[index].markCoefficient);
												}
												contentMarks += "\"> </td>";
											} else if (marks[index].mark != 0
													&& currentDate != dateOfMark) {
												contentMarks += "<td name=\""
														+ "mark"
														+ scheduleId
														+ "\" class=\"tdCenter "
														+ scheduleId;
												if (marks[index].markCoefficient == 3) {
													contentMarks += " eventTest"
												} else if (marks[index].markCoefficient == 5) {
													contentMarks += " eventExam"
												}
												contentMarks += "\">"
														+ marks[index].mark
														+ "</td>";
											} else if (marks[index].mark != 0
													&& currentDate == dateOfMark) {
												contentMarks += "<td name=\""
														+ "mark"
														+ scheduleId
														+ "\" "
														+ "id=\""
														+ studentId
														+ "j"
														+ scheduleId
														+ "\" data-value=\""
														+ studentId
														+ "j"
														+ scheduleId
														+ "\"class=\"tdCenter addMark";
												if (marks[index].markCoefficient == 3) {
													contentMarks += " eventTest"
												} else if (marks[index].markCoefficient == 5) {
													contentMarks += " eventExam"
												}
												contentMarks += "\" >"
														+ "<input id=\"dateAndStudent\""
														+ " type=\"hidden\" value=\" \" />"
														+ "<ul class=\"nav nav-pills"
														+ " pillsSizeForMark\">"
														+ "<li role=\"presentation\""
														+ " class=\"dropdown\"><a "
														+ "class=\"btn2 dropdown-toggle"
														+ " markItemCnfg\""
														+ " data-toggle=\"dropdown\""
														+ "> "
														+ marks[index].mark
														+ "</a>"
														+ "<ul class=\"dropdown-menu\""
														+ " role=\"menu\">"
														+ "<li class=\""
														+ "selectOfMarkCnfg"
														+ " deletedMark\""
														+ "\">"
														+ " <a class=\""
														+ "selectOfMarkCnfg \">"
														+ "Delete</a> </li>"
														+ "</ul></li></ul>"
														+ "</td>";
											}
										}
										contentMarks += "</tr>";
									}
									$("#journalStudentMarksJS").html(
											contentMarks);
								}
							});
				});

$(document).on("click", ".addMark", function() {
	$("#dateAndStudent").val($(this).data('value'));
});

$(document).on("click", ".futureDate", function() {
	$("#editedDate").val($(this).data('value'));
});

$(document)
		.on(
				"click",
				".selectedMark",
				function() {

					var studentAndSchedule = $("#dateAndStudent").val();
					var mark = $(this).data('value');

					var json = {
						"studentAndSchedule" : studentAndSchedule,
						"mark" : mark,
					}

					$
							.ajax({
								url : 'journal-edit-mark',
								type : 'POST',
								data : JSON.stringify(json),
								dataType : 'json',
								contentType : 'application/json',
								mimeType : 'application/json',
								success : function(mark) {
									var id = "";
									id += "#" + studentAndSchedule;
									contentMarks = "";
									contentMarks += "<input id=\"dateAndStudent\""
											+ " type=\"hidden\" value=\" \" />"
											+ "<ul class=\"nav nav-pills"
											+ " pillsSizeForMark\">"
											+ "<li role=\"presentation\""
											+ " class=\"dropdown\"><a "
											+ "class=\"btn2 dropdown-toggle"
											+ " markItemCnfg\" data-toggle=\"dropdown\""
											+ "> ";
									if (mark == (-1)) {
										contentMarks += "n/a";
									} else {
										contentMarks += mark;
									}
									contentMarks += "</a><ul class=\"dropdown-menu\""
											+ " role=\"menu\"> <li class=\""
											+ "selectOfMarkCnfg deletedMark\">"
											+ " <a class=\"selectOfMarkCnfg \">"
											+ "Delete</a> </li></ul></li></ul>"
									$(id).html(contentMarks);
								}
							});
				});

$(document).on(
		"click",
		".deletedMark",
		function() {

			var studentAndSchedule = $("#dateAndStudent").val();
			var mark = 0;

			var json = {
				"studentAndSchedule" : studentAndSchedule,
				"mark" : mark,
			}

			$.ajax({
				url : 'journal-edit-mark',
				type : 'POST',
				data : JSON.stringify(json),
				dataType : 'json',
				contentType : 'application/json',
				mimeType : 'application/json',
				success : function(mark) {
					var id = "";
					id += "#" + studentAndSchedule;
					contentMarks = "";
					contentMarks += "<input id=\"dateAndStudent\""
							+ " type=\"hidden\" value=\" \" />"
							+ "<ul class=\"nav nav-pills"
							+ " pillsSizeForMark\">"
							+ "<li role=\"presentation\""
							+ " class=\"dropdown\"><a "
							+ "class=\"btn2 dropdown-toggle"
							+ " markItemCnfg\" data-toggle=\"dropdown\">"
							+ "  </a><ul class=\"dropdown-menu\""
							+ " role=\"menu\">"
					for (var i = 1; i <= 12; i++) {
						contentMarks += "<li class=\"" + "selectOfMarkCnfg"
								+ " selectedMark\"" + " data-value=\"" + i
								+ "\">" + " <a class=\""
								+ "selectOfMarkCnfg \">" + i + "</a> </li>"
					}
					contentMarks += "<li class=\"divider\">" + " </li>"
							+ "<li class=\"selectOfMarkCnfg"
							+ " selectedMark\" data-value=\"-1\">"
							+ "<a class=\"selectOfMarkCnfg\""
							+ ">Absent </a></li></ul></li></ul>";
					$(id).html(contentMarks);
				}
			});
		});

$(document).on(
		"click",
		"#submitEditDate",
		function() {

			var scheduleId = $("#editedDate").val();
			var eventType = $("#eventTypeSelect").val();
			var eventDescription = $("#eventDescriptionSelect").val();
			var homeTask = $("#homeTasksSelect").val();

			var event = {
				"scheduleId" : scheduleId,
				"eventType" : eventType,
				"eventDescription" : eventDescription,
				"homeTask" : homeTask,
			}
			$.ajax({
				url : 'journal-edit-date',
				type : 'POST',
				data : JSON.stringify(event),
				dataType : 'json',
				contentType : 'application/json',
				mimeType : 'application/json',
				success : function(editedDate) {

					var name = "mark" + editedDate.scheduleId;
					var elements = document.getElementsByName(name);

					for ( var index in elements) {
						if (editedDate.eventType == 3) {
							addClass(elements[index], "eventTest");
						} else if (editedDate.eventType == 5) {
							addClass(elements[index], "eventExam");
						}
					}

					function addClass(element, classToAdd) {
						var currentClassValue = element.className;

						if (currentClassValue.indexOf(classToAdd) == -1) {
							if ((currentClassValue == null)
									|| (currentClassValue == "")) {
								element.className = classToAdd;
							} else {
								element.className += " " + classToAdd;
							}
						}
					}

					function removeClass(element, classToRemove) {
						var currentClassValue = element.className;

						if (currentClassValue == classToRemove) {
							element.className = "";
							return;
						}

						var classValues = currentClassValue.split(" ");
						var filteredList = [];

						for (var i = 0; i < classValues.length; i++) {
							if (classToRemove != classValues[i]) {
								filteredList.push(classValues[i]);
							}
						}

						element.className = filteredList.join(" ");
					}
				}
			});
		});

$("#eventCB").click(function() {
	if (this.checked) {
		$("#eventSelect").fadeIn();
	} else {
		$("#eventTypeSelect").val(0);
		$("#eventDescriptionSelect").val("");
		$("#eventSelect").fadeOut();
	}
});

$("#homeworkCB").click(function() {
	if (this.checked) {
		$("#homeworkSelect").fadeIn();
	} else {
		$("#homeworkSelect").fadeOut();
		$("#homeTasksSelect").val("");
	}
});
