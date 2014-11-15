<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<script src="<c:url value="https://code.jquery.com/jquery-1.10.2.js" />"></script>
<script
	src="<c:url value="https://code.jquery.com/ui/1.11.2/jquery-ui.js" />"></script>
<script src="<c:url value="/resources/js/journal.js" />"
	type="text/javascript"></script>

<link href="<c:url value="/resources/css/journal.css" />"
	rel="stylesheet">
<c:if test="${teacher ne null or parent ne null}">
	<table class="table table-condensed headerJournalBig">
		</c:if>
		<c:if test="${teacher == null and parent == null}">
			<table class="table table-condensed headerJournalSmall">
				</c:if>
				<tbody>
					<tr>
						<th class="thDate">
							<h4>
								<spring:message code="journal.date" />
							</h4>
						</th>
						<c:if test="${teacher ne null}">
							<th class="thJournal">
								<h4>
									<spring:message code="journal.group" />
								</h4>
							</th>
						</c:if>
						<c:if test="${parent ne null}">
							<th class="thSubjectAndStudent">
								<h4>Kids</h4>
							</th>
						</c:if>
						<th class="thSubjectAndStudent">
							<h4>
								<spring:message code="journal.subject" />
							</h4>
						</th>

					</tr>
					<form method="POST" action="journal">
						<tr>
							<th class="thDate">
								<div>
									<spring:message code="journal.date.from" />
									<input name="dateFrom" value="${dateFrom}" type="text"
										placeholder="<spring:message code="journal.date.from"/>"
										class="datepicker form-control-middle">
									<spring:message code="journal.date.to" />
									<input name="dateTo" value="${dateTo}" type="text"
										placeholder="<spring:message code="journal.date.to"/>"
										class="datepicker form-control-middle">
								</div>

							</th>
							<c:if test="${teacher ne null}">
								<th class="thDate">
									<div>
										<spring:message code="journal.group.number" />
										<select name="groupNumber" class="form-control-small">
											<c:forEach items="${teacher.groupNumbers}" var="groupNumber">
												<option>${groupNumber}</option>
											</c:forEach>
										</select>
										<spring:message code="journal.group.letter" />
										<select name="groupLetter" class="form-control-small">
											<option><spring:message code="journal.all" /></option>
											<c:forEach items="${teacher.groupLetters}" var="groupLetter">
												<option>${groupLetter}</option>
											</c:forEach>
										</select>
									</div>
								</th>
							</c:if>
							<c:if test="${parent ne null}">
								<th class="thSubjectAndStudent"><div>
										<select name="kid" class="form-control">
											<c:forEach items="${parent.kids}" var="kid">
												<option value="${kid.studentId}">${kid.name}</option>
											</c:forEach>
										</select>
									</div></th>
							</c:if>
							<th class="thSubjectAndStudent"><div>
									<select name="subject" class="form-control">
										<c:forEach items="${teacher.courseNames}" var="course">
											<option value="${course}">${course}</option>
										</c:forEach>
										<c:forEach items="${student.courseNames}" var="course">
											<option value="${course}">${course}</option>
										</c:forEach>
										<c:if test="${parent ne null}">
											<c:forEach items="${parent.kids}" var="kid">
												<c:forEach items="${kid.courseNames}" var="course">
													<option value="${course}">${course}</option>
												</c:forEach>
											</c:forEach>
										</c:if>
									</select>
								</div></th>

							<th class="thButton"><button class="btn btn-default"
									type="submit">
									<spring:message code="journal.submit" />
								</button></th>
						</tr>
					</form>
				</tbody>
			</table>



			<c:if test="${!empty scheduleDates}">
				<table id="docTable" class="table table-striped table-bordered">
					<tr>
						<th><spring:message code="journal.student" /></th>
						<c:forEach items="${scheduleDates}" var="date">
							<th><fmt:formatDate value="${date}" pattern="dd.MM.yy" /></th>
						</c:forEach>
					</tr>
					<c:forEach items="${studentDtos}" var="student">
						<tr>
							<th>${student.name}</th>
							<c:forEach items="${scheduleDates}" var="date">
								<td><c:forEach items="${student.marks}" var="mark">
										<c:if test="${date == mark.key}">
											<c:out value="${mark.value}"></c:out>
										</c:if>
									</c:forEach></td>
							</c:forEach>
						</tr>
					</c:forEach>
				</table>
			</c:if>